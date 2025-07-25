import { FeaturesSection } from '@/components/FeaturesSection';
import { FinalCTA } from '@/components/FinalCTA';
import { Hero } from '@/components/Hero';
import { PricingSection } from '@/components/PricingSection';
import { ProblemSection } from '@/components/ProblemSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';

export default async function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTA />
    </div>
  );
}
