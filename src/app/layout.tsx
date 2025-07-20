import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "ReConfi Smile - 專業陶瓷貼片服務 | 香港",
  description: "ReConfi Smile 提供專業的陶瓷貼片服務，讓您擁有完美的笑容。立即預約諮詢，體驗專業的牙科美容服務。",
  keywords: "陶瓷貼片, 牙科美容, 笑容設計, 香港牙醫, ReConfi Smile",
  icons: {
    icon: '/logo-blue.png',
    apple: '/logo-blue.png',
  },
  openGraph: {
    title: "ReConfi Smile - 專業陶瓷貼片服務",
    description: "讓您擁有完美的笑容，專業的陶瓷貼片服務",
    type: "website",
    locale: "zh_HK",
    images: ['/logo-blue.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      <body className="font-sans antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
