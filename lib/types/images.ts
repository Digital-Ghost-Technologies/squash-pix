export interface ImageFile {
  id: string;
  file: File;
  originalSize: number;
  compressedSize: number;
  originalUrl: string;
  compressedUrl: string;
  compressedBlob?: Blob; // Store the actual compressed blob
  format: string;
  quality: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
}

export interface CompressionSettings {
  format: 'webp' | 'avif' | 'jpeg-xl' | 'png' | 'jpeg';
  quality: number;
}

export interface BatchPreset {
  name: string;
  settings: CompressionSettings;
  description: string;
}