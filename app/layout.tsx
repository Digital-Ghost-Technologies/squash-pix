import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { exo2, spaceMono } from "@/lib/font";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Squash Pix - Convert & Compress Images",
  description: "Convert and compress images to WebP, AVIF, JPEG XL formats",
  icons: {
    icon: "/favicon.svg", // main favicon
    shortcut: "/favicon.svg", // browser shortcuts
    apple: "/favicon.svg", // iOS PWA / Safari
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${exo2.variable} ${spaceMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
