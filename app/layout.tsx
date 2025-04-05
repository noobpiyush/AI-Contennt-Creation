import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AdSense from "@/components/AdSense";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const baseUrl = "https://ai-contennt-creation.vercel.app"


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AI Content Studio - Generate Professional Content with AI",
    template: "%s | AI Content Studio",
  },
  description:
    "Create stunning images, videos, and social media posts with AI. Our platform helps content creators and marketers generate professional content in seconds.",
  keywords: [
    "AI content",
    "AI image generator",
    "AI video creator",
    "social media content",
    "content creation",
    "AI tools",
    "marketing content",
  ],
  authors: [{ name: "AI Content Studio Team" }],
  creator: "AI Content Studio",
  publisher: "AI Content Studio",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "AI Content Studio - Generate Professional Content with AI",
    description:
      "Create stunning images, videos, and social media posts with AI. Our platform helps content creators and marketers generate professional content in seconds.",
    siteName: "AI Content Studio",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AI Content Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Studio - Generate Professional Content with AI",
    description:
      "Create stunning images, videos, and social media posts with AI. Our platform helps content creators and marketers generate professional content in seconds.",
    creator: "@aicontentstudio",
    images: [`${baseUrl}/twitter-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": `${baseUrl}/en-US`,
      "es-ES": `${baseUrl}/es-ES`,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
      <AdSense pId={`${process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID}`} />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
