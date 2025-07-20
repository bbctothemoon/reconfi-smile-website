import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ReConfi Smile - 專業牙科美容服務',
    template: '%s | ReConfi Smile'
  },
  description: 'ReConfi Smile 提供專業的牙科美容服務，包括陶瓷貼片、笑容設計等。讓您擁有自信完美的笑容。',
  keywords: [
    '牙科美容',
    '陶瓷貼片',
    '笑容設計',
    '香港牙科',
    'ReConfi Smile',
    '牙科診所'
  ],
  authors: [{ name: 'ReConfi Smile' }],
  creator: 'ReConfi Smile',
  publisher: 'ReConfi Smile',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://reconfihk.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_HK',
    url: 'https://reconfihk.com',
    title: 'ReConfi Smile - 專業牙科美容服務',
    description: 'ReConfi Smile 提供專業的牙科美容服務，包括陶瓷貼片、笑容設計等。讓您擁有自信完美的笑容。',
    siteName: 'ReConfi Smile',
    images: [
      {
        url: '/logo-blue.png',
        width: 1200,
        height: 630,
        alt: 'ReConfi Smile Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReConfi Smile - 專業牙科美容服務',
    description: 'ReConfi Smile 提供專業的牙科美容服務，包括陶瓷貼片、笑容設計等。',
    images: ['/logo-blue.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-HK">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo-blue.png" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* 結構化數據 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              "name": "ReConfi Smile",
              "description": "專業牙科美容服務，包括陶瓷貼片、笑容設計等",
              "url": "https://reconfihk.com",
              "logo": "https://reconfihk.com/logo-blue.png",
              "image": "https://reconfihk.com/logo-blue.png",
              "telephone": "+852 6530 6270",
              "email": "info@reconfi.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "HK",
                "addressRegion": "Hong Kong"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "22.3193",
                "longitude": "114.1694"
              },
              "openingHours": "Mo-Fr 09:00-18:00",
              "priceRange": "$$",
              "paymentAccepted": "Cash, Credit Card",
              "currenciesAccepted": "HKD",
              "medicalSpecialty": "Dental Care",
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
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* 版本號顯示 */}
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-xs opacity-75 hover:opacity-100 transition-opacity">
          v1.2.0
        </div>
      </body>
    </html>
  );
}
