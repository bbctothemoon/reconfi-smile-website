import Hero from '@/components/Hero';
import Calculator from '@/components/Calculator';
import TestimonialsWithBeforeAfter from '@/components/TestimonialsWithBeforeAfter';
import USP from '@/components/USP';
import LeadForm from '@/components/LeadForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Calculator />
      <TestimonialsWithBeforeAfter />
      <USP />
      <LeadForm />
    </div>
  );
}
