import Hero from '@/components/Hero';
import Calculator from '@/components/Calculator';
import TestimonialsWithBeforeAfter from '@/components/TestimonialsWithBeforeAfter';
import USP from '@/components/USP';
import Courses from '@/components/Courses';
import Team from '@/components/Team';
import InstagramFeed from '@/components/InstagramFeed';
import LeadForm from '@/components/LeadForm';
import MobileCTA from '@/components/MobileCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ReConfi Smile - 專業陶瓷貼片服務 | 香港牙科美容專家',
  description: 'ReConfi Smile 提供專業的陶瓷貼片服務，讓您擁有完美的笑容。使用國際品牌材料，資深牙醫團隊，為您度身訂造自然、自信的完美笑容。立即預約諮詢，體驗專業牙科美容服務。',
  keywords: [
    '陶瓷貼片',
    '牙科美容', 
    '笑容設計',
    '香港牙醫',
    'ReConfi Smile',
    '牙齒美白',
    '前牙美觀',
    '牙科診所',
    '牙科服務',
    '牙科治療',
    '牙科諮詢',
    '牙科預約',
    '牙科美容專家',
    '陶瓷貼片價格',
    '牙科美容案例'
  ],
  openGraph: {
    title: 'ReConfi Smile - 專業陶瓷貼片服務 | 香港牙科美容專家',
    description: 'ReConfi Smile 提供專業的陶瓷貼片服務，讓您擁有完美的笑容。使用國際品牌材料，資深牙醫團隊，為您度身訂造自然、自信的完美笑容。',
    type: 'website',
    url: 'https://reconfihk.com',
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
    title: 'ReConfi Smile - 專業陶瓷貼片服務 | 香港牙科美容專家',
    description: 'ReConfi Smile 提供專業的陶瓷貼片服務，讓您擁有完美的笑容。',
    images: ['/logo-blue.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Calculator />
      <Courses />
      <TestimonialsWithBeforeAfter />
      <Team />
      <InstagramFeed />
      <USP />
      <LeadForm />
      <MobileCTA />
    </div>
  );
}
