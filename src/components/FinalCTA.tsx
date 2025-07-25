import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-3 mb-8">
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-white font-medium">
            Join thousands already saving more
          </span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Start growing today
        </h2>

        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Take the first step toward financial clarity and better habits. Your
          future self will thank you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white text-primary hover:bg-white/90"
          >
            Create your free account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="mt-8 text-white/80 text-sm">
          <p>✓ Setup takes less than 2 minutes</p>
          <p>✓ No spam, ever</p>
        </div>
      </div>
    </section>
  );
};
