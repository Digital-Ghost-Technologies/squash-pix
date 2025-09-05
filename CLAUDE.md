# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SquashPix is a Next.js application for image compression and conversion, built with TypeScript and Tailwind CSS. The app focuses on converting images to modern formats like WebP, AVIF, and JPEG XL.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production app with Turbopack  
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React
- **Fonts**: Exo 2 and Space Mono (via next/font)

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - React components organized by type:
  - `ui/` - shadcn/ui components (Button, DropZone, ThemeToggle)
  - `layout/` - Layout components (Header, Footer)  
  - `providers/` - Context providers (ThemeProvider)
- `lib/` - Utilities and business logic:
  - `types/` - TypeScript type definitions
  - `image-processing/` - Image conversion logic
  - `hooks/` - Custom React hooks
  - `utils.ts` - Utility functions with clsx and tailwind-merge

### Key Components
- **DropZone**: Main file upload interface for image processing
- **ThemeProvider**: Wraps app with next-themes provider
- **Layout**: Uses Header/Footer pattern with theme switching

### shadcn/ui Configuration
The project uses shadcn/ui with:
- New York style variant
- Slate base color with CSS variables
- Path aliases: `@/components`, `@/lib`, `@/ui`, `@/hooks`
- Components installed in `components/ui/`

### Image Processing Architecture
The app appears designed around:
- File upload via DropZone component
- Compression settings (format, quality)
- Image processing workflow (likely client-side)
- Support for WebP, AVIF, JPEG XL formats