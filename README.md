# SquashPix

A modern, privacy-focused image compression and conversion tool built with Next.js. Convert and compress your images to modern formats like WebP, AVIF, and JPEG XL - all processing happens in your browser for complete privacy.

![SquashPix Screenshot](./public/screenshot.png)

## Features

- 🖼️ **Multiple Format Support**: Convert to WebP, AVIF, JPEG, PNG, and JPEG XL
- 🎛️ **Quality Control**: Adjustable compression quality from 20% to 100%
- ⚡ **Quick Presets**: Web Optimized, High Quality, Ultra Compressed, and Modern Browser presets
- 📱 **Drag & Drop**: Easy file upload with drag and drop support
- 🔒 **Complete Privacy**: All processing happens in your browser - no server uploads
- 📦 **Batch Processing**: Upload and process multiple images at once
- 💾 **Flexible Downloads**: Download individual images or all as a ZIP file
- 🌙 **Dark/Light Mode**: Toggle between themes
- 📊 **Compression Stats**: See file size savings and compression ratios
- 🔄 **Real-time Preview**: See results instantly with progress indicators

## Supported Formats

### Input Formats
- JPEG/JPG
- PNG  
- GIF
- WebP
- AVIF
- JPEG XL

### Output Formats
- **WebP**: Excellent compression with broad browser support
- **AVIF**: Next-generation format with superior compression
- **JPEG**: Classic format with reliable compatibility
- **PNG**: Lossless compression for images with transparency
- **JPEG XL**: Future-proof format with advanced compression

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd squash-pix
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Technology Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **UI Components**: shadcn/ui with Radix UI primitives  
- **Styling**: Tailwind CSS v4 with CSS variables
- **Image Processing**: 
  - `browser-image-compression` for modern format compression
  - HTML5 Canvas API for fallback compression
  - Modular compression system with intelligent method selection
- **File Handling**: JSZip for batch downloads, file-saver for downloads
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React
- **Fonts**: Exo 2 and Space Mono via next/font

## Architecture

### Compression Engine
The app uses a modular compression system with three methods:

1. **Browser Image Compression**: Primary method for WebP, AVIF using `browser-image-compression`
2. **Canvas Compression**: Fallback method using HTML5 Canvas API
3. **WASM Compression**: Future-ready for WebAssembly encoders (placeholder)

### Key Components
- **DropZone**: File upload with drag & drop
- **FormatSelector**: Output format selection
- **QualitySlider**: Dynamic quality adjustment  
- **PresetSelector**: Quick compression presets
- **ImageCard**: Individual image preview with actions

## Development Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production application  
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Browser Support

- **WebP**: Supported in all modern browsers
- **AVIF**: Chrome 85+, Firefox 93+ (automatic fallback to JPEG if not supported)
- **JPEG XL**: Limited support (future implementation)

## Privacy & Security

- **Client-side Processing**: All image compression happens in your browser
- **No Server Uploads**: Images never leave your device
- **No Data Collection**: No analytics, tracking, or data storage
- **Secure**: No external API calls for image processing

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) for efficient client-side compression
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework
