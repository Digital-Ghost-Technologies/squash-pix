import { ImageFile } from '@/lib/types/images';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export async function downloadAsZip(images: ImageFile[]): Promise<void> {
  const zip = new JSZip();
  
  for (const image of images) {
    if (image.status === 'completed' && image.compressedBlob) {
      try {
        const extension = image.format === 'jpeg' ? 'jpg' : 
                         image.format === 'jpeg-xl' ? 'jxl' : 
                         image.format;
                         
        const filename = `${image.file.name.split('.')[0]}_compressed.${extension}`;
        
        zip.file(filename, image.compressedBlob);
      } catch (error) {
        console.error(`Failed to add ${image.file.name} to zip:`, error);
      }
    }
  }
  
  try {
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'squashlypix_compressed_images.zip');
  } catch (error) {
    throw new Error('Failed to create ZIP file');
  }
}