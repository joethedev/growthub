import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PricingSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Start for free, upgrade when you're ready
        </h2>

        <p className="text-xl text-muted-foreground mb-12">
          Get all the essential features you need to take control of your money
          - completely free.
        </p>

        <div className="bg-card rounded-2xl p-8 shadow-lg border-2 border-primary/20 max-w-md mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Individual Plan</h3>
            <div className="text-4xl font-bold text-primary mb-2">Free</div>
            <p className="text-muted-foreground">
              Forever, no credit card required
            </p>
          </div>

          <ul className="space-y-4 mb-8 text-left">
            {[
              'Unlimited spending tracking',
              'Custom categories & goals',
              'Visual progress indicators',
              'Habit streak tracking',
              'Mobile & web access',
              'Data export & backup',
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button size="lg" className="w-full text-lg py-6 rounded-2xl">
            Get Started Free
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            Need team features?{' '}
            <a href="#" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
