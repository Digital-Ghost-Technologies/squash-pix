import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { exo2, spaceMono } from "@/lib/font";
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";

export const metadata: Metadata = {
  title: "Squash Pix - Convert & Compress Images",
  description: "Convert and compress images to WebP, AVIF, JPEG XL formats",
  icons: {
    icon: "/favicon.svg", // main favicon
    shortcut: "/favicon.svg", // browser shortcuts
    apple: "/favicon.svg", // iOS PWA / Safari
  },
  other: {
    "google-adsense-account": "ca-pub-1050367821834787",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1050367821834787"
          crossorigin="anonymous"></script>
      </Head>
      <GoogleTagManager gtmId="GTM-W7VZXWBZ" />
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
