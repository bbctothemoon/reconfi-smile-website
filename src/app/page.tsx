import Hero from '@/components/Hero';
import Calculator from '@/components/Calculator';
import TestimonialsWithBeforeAfter from '@/components/TestimonialsWithBeforeAfter';
import USP from '@/components/USP';
import Courses from '@/components/Courses';
import Team from '@/components/Team';
import InstagramFeed from '@/components/InstagramFeed';
import LeadForm from '@/components/LeadForm';
import MobileCTA from '@/components/MobileCTA';

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
