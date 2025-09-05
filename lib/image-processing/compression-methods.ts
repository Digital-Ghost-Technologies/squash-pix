import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  quality: number; // 0-100
  format: string;
  maxWidth?: number;
  maxHeight?: number;
}

export interface CompressionResult {
  blob: Blob;
  size: number;
  method: string;
}

/**
 * Compress image using browser-image-compression library
 * Best for: WebP, AVIF, JPEG with modern compression algorithms
 */
export async function compressWithBrowserImageCompression(
  file: File,
  options: CompressionOptions,
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  try {
    onProgress?.(20);

    const qualityValue = options.quality / 100;
    let mimeType = 'image/jpeg';

    switch (options.format) {
      case 'webp':
        mimeType = 'image/webp';
        break;
      case 'avif':
        mimeType = 'image/avif';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      default:
        mimeType = 'image/jpeg';
        break;
    }

    onProgress?.(40);

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 10,
      maxWidthOrHeight: options.maxWidth || options.maxHeight || 4096,
      useWebWorker: true,
      initialQuality: qualityValue,
      fileType: mimeType,
      onProgress: (progress: number) => {
        onProgress?.(40 + (progress * 0.6)); // Map 0-100 to 40-100
      },
    });

    onProgress?.(100);

    return {
      blob: compressedFile,
      size: compressedFile.size,
      method: 'browser-image-compression'
    };
  } catch (error) {
    throw new Error(`Browser compression failed: ${error}`);
  }
}

/**
 * Compress image using HTML5 Canvas API
 * Best for: JPEG, PNG, basic WebP support
 */
export async function compressWithCanvas(
  file: File,
  options: CompressionOptions,
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    try {
      onProgress?.(10);

      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas context not supported'));
        return;
      }

      img.onload = () => {
        try {
          onProgress?.(30);

          // Calculate dimensions
          let { width, height } = img;
          
          if (options.maxWidth && width > options.maxWidth) {
            height = (height * options.maxWidth) / width;
            width = options.maxWidth;
          }
          
          if (options.maxHeight && height > options.maxHeight) {
            width = (width * options.maxHeight) / height;
            height = options.maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          onProgress?.(50);

          // Draw image
          ctx.drawImage(img, 0, 0, width, height);

          onProgress?.(70);

          // Determine output format
          let mimeType = 'image/jpeg';
          const qualityValue = options.quality / 100;

          switch (options.format) {
            case 'webp':
              mimeType = 'image/webp';
              break;
            case 'png':
              mimeType = 'image/png';
              break;
            default:
              mimeType = 'image/jpeg';
              break;
          }

          // Check browser support
          const testCanvas = document.createElement('canvas');
          testCanvas.width = 1;
          testCanvas.height = 1;
          const supportsFormat = testCanvas.toDataURL(mimeType).indexOf(mimeType) === 5;

          if (!supportsFormat && options.format !== 'jpeg') {
            console.warn(`Canvas doesn't support ${options.format}, falling back to JPEG`);
            mimeType = 'image/jpeg';
          }

          onProgress?.(90);

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to create blob from canvas'));
                return;
              }

              onProgress?.(100);
              
              resolve({
                blob,
                size: blob.size,
                method: 'canvas'
              });
            },
            mimeType,
            mimeType === 'image/png' ? undefined : qualityValue
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Compress image using WASM-based encoder (placeholder for future implementation)
 * Best for: Advanced compression algorithms, custom formats
 */
export async function compressWithWASM(
  file: File,
  options: CompressionOptions,
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  // Placeholder implementation - would integrate with WASM encoders like:
  // - @squoosh/lib for various formats
  // - mozjpeg-wasm for JPEG
  // - webp-wasm for WebP
  // - avif-wasm for AVIF
  
  onProgress?.(20);
  
  // For now, fall back to canvas method
  console.warn('WASM compression not yet implemented, falling back to canvas');
  
  onProgress?.(40);
  
  try {
    const result = await compressWithCanvas(file, options, (progress) => {
      onProgress?.(40 + (progress * 0.6)); // Map canvas progress to 40-100 range
    });
    
    return {
      ...result,
      method: 'wasm-fallback-canvas'
    };
  } catch (error) {
    throw new Error(`WASM compression failed: ${error}`);
  }
}

/**
 * Helper function to choose the best compression method based on format and browser support
 */
export function selectBestCompressionMethod(format: string): 'browser' | 'canvas' | 'wasm' {
  switch (format) {
    case 'avif':
    case 'webp':
      // Try browser-image-compression first for modern formats
      return 'browser';
    case 'jpeg':
    case 'png':
      // Canvas works well for these traditional formats
      return 'canvas';
    case 'jpeg-xl':
      // Future: WASM would be needed for JPEG XL
      return 'wasm';
    default:
      return 'canvas';
  }
}