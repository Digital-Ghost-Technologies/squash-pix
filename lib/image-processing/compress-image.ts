import { processImage } from "@/lib/image-processing/image-processor";
import { CompressionSettings, ImageFile } from "@/lib/types/images";

// Utility function that takes in helpers instead of accessing React state directly
export async function compressAndUpdateImage(
  image: ImageFile,
  currentSettings: CompressionSettings,
  updateProgress: (id: string, progress: number) => void,
  updateStatus: (id: string, updates: Partial<ImageFile>) => void
) {
  try {
    // Mark as processing
    updateStatus(image.id, {
      status: "processing",
      progress: 0,
      format: currentSettings.format,
      quality: currentSettings.quality,
    });

    const result = await processImage(
      image.file,
      currentSettings.format,
      currentSettings.quality,
      (progress) => updateProgress(image.id, progress)
    );

    // Clean up old object URL
    if (image.compressedUrl) {
      URL.revokeObjectURL(image.compressedUrl);
    }

    const compressedUrl = URL.createObjectURL(result.blob);

    // Mark as completed
    updateStatus(image.id, {
      compressedUrl,
      compressedBlob: result.blob, // Store the actual blob
      compressedSize: result.size,
      status: "completed",
      progress: 100,
    });
  } catch (error) {
    console.error("Processing failed:", error);
    updateStatus(image.id, { status: "error" });
  }
}
