import { saveAs } from "file-saver";
import { ImageFile } from "./types/images";

export function downloadImage(image: ImageFile) {
  if (image.status === 'completed' && image.compressedBlob) {
    // Use the stored blob directly
    const extension = image.format === 'jpeg' ? 'jpg' : 
                     image.format === 'jpeg-xl' ? 'jxl' : 
                     image.format;
    const fileName = `${image.file.name.replace(/\.[^/.]+$/, "")}_compressed.${extension}`;
    
    saveAs(image.compressedBlob, fileName);
  } else {
    // Fallback to original file if compression failed or is still processing
    const extension = image.format.startsWith(".") ? image.format : `.${image.format}`;
    const fileName = `${image.file.name.replace(/\.[^/.]+$/, "")}${extension}`;
    saveAs(image.file, fileName);
  }
}
