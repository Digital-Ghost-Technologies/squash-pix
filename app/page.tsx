"use client"

import { AdUnit } from '@/components/ad-unit';
import { Button } from '@/components/ui/button';
import { DropZone } from '@/components/ui/drop-zone';
import { FormatSelector } from '@/components/ui/format-selector';
import { ImageCard } from '@/components/ui/image-card';
import { PresetSelector } from '@/components/ui/preset-selector';
import { QualitySlider } from '@/components/ui/quality-slider';
import { QualityPreset } from '@/lib/constants';
import { downloadImage } from '@/lib/download-image';
import { downloadAsZip } from '@/lib/download-zip';
import { compressAndUpdateImage } from '@/lib/image-processing/compress-image';
import { processImage } from '@/lib/image-processing/image-processor';
import { CompressionSettings, ImageFile } from '@/lib/types/images';
import { generateId } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<CompressionSettings>({
    format: 'webp',
    quality: 80
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // Helpers for updating state (these wrap setImages so lib stays UI-agnostic)
  const updateProgress = (id: string, progress: number) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, progress } : img))
    );
  };

  const updateStatus = (id: string, updates: Partial<ImageFile>) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...updates } : img))
    );
  };

  // 🟢 Cleanup effect for all object URLs
  useEffect(() => {
    return () => {
      images.forEach(img => {
        if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
        if (img.originalUrl) URL.revokeObjectURL(img.originalUrl);
      });
    };
  }, [images]);

  const processImagesWithSettings = useCallback(async (files: File[], currentSettings: CompressionSettings) => {
    const newImages: ImageFile[] = files.map(file => ({
      id: generateId(),
      file,
      originalSize: file.size,
      compressedSize: 0,
      originalUrl: URL.createObjectURL(file),
      compressedUrl: '',
      format: currentSettings.format,
      quality: currentSettings.quality,
      status: 'pending',
      progress: 0
    }));

    setImages(prev => [...prev, ...newImages]);
    setIsProcessing(true);

    // Process images one by one
    for (const image of newImages) {
      await compressAndUpdateImage(
        image,
        currentSettings,
        updateProgress,
        updateStatus
      );
    }

    setIsProcessing(false);
  }, []);

  // Handle new file selection
  const handleFileSelected = useCallback(
    async (files: File[]) => {
      await processImagesWithSettings(files, settings);
    },
    [settings, processImagesWithSettings]
  );

  // Reprocess images when settings change
  const handleSettingsChange = useCallback(async (newSettings: Partial<CompressionSettings>, keepPreset = false) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    // Clear selected preset when manually adjusting settings (unless explicitly keeping it)
    if (!keepPreset) {
      setSelectedPreset(null);
    }

    // Reprocess existing images with new settings
    const imagesToReprocess = images.filter(img => img.status === 'completed');
    if (imagesToReprocess.length > 0 && !isProcessing) {
      setIsProcessing(true);

      for (const image of imagesToReprocess) {
        try {
          setImages(prev => prev.map(img =>
            img.id === image.id
              ? { ...img, status: 'processing' as const, progress: 0, format: updatedSettings.format, quality: updatedSettings.quality }
              : img
          ));

          const result = await processImage(
            image.file,
            updatedSettings.format,
            updatedSettings.quality,
            (progress) => {
              setImages(prev => prev.map(img =>
                img.id === image.id
                  ? { ...img, progress }
                  : img
              ));
            }
          );

          // Clean up old compressed URL
          if (image.compressedUrl) {
            URL.revokeObjectURL(image.compressedUrl);
          }

          const compressedUrl = URL.createObjectURL(result.blob);

          setImages(prev => prev.map(img =>
            img.id === image.id
              ? {
                ...img,
                compressedUrl,
                compressedBlob: result.blob, // Store the blob here too
                compressedSize: result.size,
                status: 'completed' as const,
                progress: 100
              }
              : img
          ));
        } catch (error) {
          console.error('Reprocessing failed:', error);
          setImages(prev => prev.map(img =>
            img.id === image.id
              ? { ...img, status: 'error' as const }
              : img
          ));
        }
      }

      setIsProcessing(false);
    }
  }, [settings, images, isProcessing]);

  const handleQualityCommit = useCallback((quality: number) => {
    handleSettingsChange({ quality });
  }, [handleSettingsChange]);

  const handlePresetSelect = useCallback((preset: QualityPreset) => {
    const presetName = preset.name;
    if (presetName) {
      setSelectedPreset(presetName);
      handleSettingsChange(preset.settings, true); // keepPreset = true
    }
  }, [handleSettingsChange]);

  //Image handle funtions
  const handleDeleteImage = useCallback((id: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove && imageToRemove.compressedUrl) {
        URL.revokeObjectURL(imageToRemove.compressedUrl);
      } else if (imageToRemove && imageToRemove.originalUrl) {
        URL.revokeObjectURL(imageToRemove.originalUrl);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const handleDownloadImage = useCallback((id: string) => {
    const image = images.find(img => img.id === id);
    if (image) {
      downloadImage(image);
    }
  }, [images]);

  return (
    <div className="font-sans bg-accent min-h-screen">
      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className='flex flex-col items-center justify-center'>
          <h1 className="text-5xl font-bold">Welcome to SquashPix</h1>
          <p className="mt-4 text-foreground">
            Upload your images and convert them to modern formats for better web performance.</p>
          <p className="text-foreground"> All processing happens in your browser for complete privacy.</p>
        </section>

        <section className="space-y-6">
          <DropZone onFileSelected={handleFileSelected} isProcessing={false} />
        </section>

        {/* Settings Panel */}
        <section className="bg-background border-border rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-2xl text-foreground font-bold">Compression Settings</h2>
          <div className="mt-4">
            <FormatSelector selectedFormat={settings.format} onFormatChange={(format) => handleSettingsChange({ format: format as CompressionSettings['format'] })}></FormatSelector>
          </div>
          <div className="mt-4">
            <QualitySlider
              defaultQuality={settings.quality}
              onQualityCommit={handleQualityCommit}
              disabled={isProcessing}
            />
          </div>
          <div className="mt-4">
            <PresetSelector
              activePreset={selectedPreset}
              onPresetSelect={handlePresetSelect}
            />
          </div>
        </section>

        {/* Ad Section */}
        <section className="w-full flex justify-center py-4">
          <AdUnit 
            adSlot="1234567890" 
            adFormat="auto"
            className="w-full max-w-4xl"
          />
        </section>

        {/* Results Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Your Images ({images.length})</h3>
            {images.length > 0 && (
              <Button className="cursor-pointer" onClick={() => downloadAsZip(images)}>Download All</Button>
            )}
          </div>
          <div className="space-y-3">
            {images.map(image => (
              <ImageCard
                key={image.id}
                image={image}
                onDelete={() => handleDeleteImage(image.id)}
                onDownload={() => handleDownloadImage(image.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
