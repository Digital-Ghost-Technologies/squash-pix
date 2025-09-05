// Browser support detection for image formats

export function checkFormatSupport(): {
  webp: boolean;
  avif: boolean;
  jpegXl: boolean;
} {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { webp: false, avif: false, jpegXl: false };
  }
  
  // Fill with a single pixel
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 1, 1);
  
  const webp = canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
  const avif = canvas.toDataURL('image/avif').indexOf('image/avif') === 5;
  
  // JPEG XL is not supported by toDataURL yet in most browsers
  const jpegXl = false;
  
  return { webp, avif, jpegXl };
}

export function getUnsupportedFormats(): string[] {
  const support = checkFormatSupport();
  const unsupported: string[] = [];
  
  if (!support.webp) unsupported.push('webp');
  if (!support.avif) unsupported.push('avif');
  if (!support.jpegXl) unsupported.push('jpeg-xl');
  
  return unsupported;
}