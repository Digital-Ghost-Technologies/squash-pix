
// src/lib/constants.ts
export const supportedFormats = [
  { value: 'webp', label: 'WebP', extension: '.webp', mime: 'image/webp' },
  { value: 'avif', label: 'AVIF', extension: '.avif', mime: 'image/avif' },
  { value: 'jpeg', label: 'JPEG', extension: '.jpg', mime: 'image/jpeg' },
  { value: 'jpeg-xl', label: 'JPEG XL', extension: '.jxl', mime: 'image/jxl' },
  { value: 'png', label: 'PNG', extension: '.png', mime: 'image/png' },
] as const;

export const qualityPresets = [
  {
    name: "Web Optimized",
    settings: { format: "webp" as const, quality: 80 },
    description: "Best balance of quality and file size for websites",
  },
  {
    name: "High Quality",
    settings: { format: "webp" as const, quality: 90 },
    description: "Minimal compression for maximum quality",
  },
  {
    name: "Ultra Compressed",
    settings: { format: "webp" as const, quality: 60 },
    description: "Maximum compression for faster loading",
  },
  {
    name: "Modern Browser",
    settings: { format: "avif" as const, quality: 75 },
    description: "Next-gen format for modern browsers",
  },
] as const;

export type QualityPreset = typeof qualityPresets[number];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
  'image/jpeg-xl',
];