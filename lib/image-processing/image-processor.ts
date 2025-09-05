import {
  compressWithBrowserImageCompression,
  compressWithCanvas,
  compressWithWASM,
  selectBestCompressionMethod,
  type CompressionOptions,
  type CompressionResult
} from './compression-methods';

export async function processImage(
  file: File,
  format: string,
  quality: number,
  onProgress?: (progress: number) => void
): Promise<{ blob: Blob; size: number }> {
  try {
    onProgress?.(5);

    const options: CompressionOptions = {
      quality,
      format,
      maxWidth: 4096,
      maxHeight: 4096
    };

    onProgress?.(10);

    // Select the best compression method for the format
    const method = selectBestCompressionMethod(format);
    
    let result: CompressionResult;
    let fallbackAttempted = false;

    try {
      switch (method) {
        case 'browser':
          onProgress?.(20);
          result = await compressWithBrowserImageCompression(file, options, (progress) => {
            onProgress?.(20 + (progress * 0.6)); // Map to 20-80 range
          });
          break;

        case 'canvas':
          onProgress?.(20);
          result = await compressWithCanvas(file, options, (progress) => {
            onProgress?.(20 + (progress * 0.6)); // Map to 20-80 range
          });
          break;

        case 'wasm':
          onProgress?.(20);
          result = await compressWithWASM(file, options, (progress) => {
            onProgress?.(20 + (progress * 0.6)); // Map to 20-80 range
          });
          break;

        default:
          throw new Error(`Unknown compression method: ${method}`);
      }
    } catch (error) {
      console.warn(`Primary compression method '${method}' failed:`, error);
      
      if (!fallbackAttempted) {
        fallbackAttempted = true;
        onProgress?.(50);
        
        try {
          // Try canvas as fallback if browser method failed
          if (method !== 'canvas') {
            console.log('Falling back to canvas compression');
            result = await compressWithCanvas(file, options, (progress) => {
              onProgress?.(50 + (progress * 0.4)); // Map to 50-90 range
            });
          } else {
            // Try browser method as fallback if canvas failed
            console.log('Falling back to browser-image-compression');
            result = await compressWithBrowserImageCompression(file, options, (progress) => {
              onProgress?.(50 + (progress * 0.4)); // Map to 50-90 range
            });
          }
        } catch (fallbackError) {
          throw new Error(`Both primary and fallback compression failed. Primary: ${error}, Fallback: ${fallbackError}`);
        }
      } else {
        throw error;
      }
    }

    onProgress?.(95);

    // Log compression results
    const originalSize = file.size;
    const compressedSize = result.size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
    
    console.log(`Compression complete:`, {
      method: result.method,
      original: `${(originalSize / 1024).toFixed(1)} KB`,
      compressed: `${(compressedSize / 1024).toFixed(1)} KB`,
      saved: `${compressionRatio.toFixed(1)}%`,
      format
    });

    onProgress?.(100);

    return {
      blob: result.blob,
      size: result.size
    };
  } catch (error) {
    throw new Error(`Image processing failed: ${error}`);
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function calculateCompressionRatio(originalSize: number, compressedSize: number): string {
  const ratio = ((originalSize - compressedSize) / originalSize) * 100;
  return `${Math.round(ratio)}%`;
}