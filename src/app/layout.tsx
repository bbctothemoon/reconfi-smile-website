import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: "ReConfi Smile - 專業陶瓷貼片服務 | 香港",
    template: "%s | ReConfi Smile"
  },
  description: "ReConfi Smile 提供專業的陶瓷貼片服務，讓您擁有完美的笑容。使用國際品牌材料，資深牙醫團隊，為您度身訂造自然、自信的完美笑容。立即預約諮詢。",
  keywords: [
    "陶瓷貼片",
    "牙科美容", 
    "笑容設計",
    "香港牙醫",
    "ReConfi Smile",
    "牙齒美白",
    "前牙美觀",
    "牙科診所",
    "牙科服務",
    "牙科治療",
    "牙科諮詢",
    "牙科預約"
  ],
  authors: [{ name: "ReConfi Smile" }],
  creator: "ReConfi Smile",
  publisher: "ReConfi Smile",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://reconfihk.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo-blue.png', type: 'image/png' }
    ],
    apple: '/logo-blue.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'zh_HK',
    url: 'https://reconfihk.com',
    title: 'ReConfi Smile - 專業陶瓷貼片服務 | 香港',
    description: 'ReConfi Smile 提供專業的陶瓷貼片服務，讓您擁有完美的笑容。使用國際品牌材料，資深牙醫團隊，為您度身訂造自然、自信的完美笑容。',
    siteName: 'ReConfi Smile',
    images: [
      {
        url: '/logo-blue.png',
        width: 1200,
        height: 630,
        alt: 'ReConfi Smile - 專業陶瓷貼片服務',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReConfi Smile - 專業陶瓷貼片服務 | 香港',
    description: 'ReConfi Smile 提供專業的陶瓷貼片服務，讓您擁有完美的笑容。',
    images: ['/logo-blue.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      </head>
      <body className="font-sans antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DentalClinic",
              "name": "ReConfi Smile",
              "description": "專業的陶瓷貼片服務，讓您擁有完美的笑容",
              "url": "https://reconfihk.com",
              "telephone": "+85265306270",
              "email": "info@reconfihk.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "香港",
                "addressCountry": "HK"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "22.3193",
                "longitude": "114.1694"
              },
              "openingHours": "Mo-Fr 09:00-18:00",
              "priceRange": "$$",
              "sameAs": [
                "https://instagram.com/reconfihk"
              ],
              "serviceType": "陶瓷貼片服務",
              "areaServed": "香港",
              "medicalSpecialty": "牙科美容",
              "availableService": [
                {
                  "@type": "MedicalProcedure",
                  "name": "陶瓷貼片",
                  "description": "專業的陶瓷貼片服務"
                },
                {
                  "@type": "MedicalProcedure", 
                  "name": "笑容設計",
                  "description": "個人化笑容設計服務"
                }
              ],
              "logo": {
                "@type": "ImageObject",
                "url": "https://reconfihk.com/logo-blue.png"
              },
              "image": {
                "@type": "ImageObject",
                "url": "https://reconfihk.com/logo-blue.png"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
