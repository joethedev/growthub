import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import appMockupLaptop from '../../public/assets/app-mockup-laptop-BzmVbMEi.jpeg';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 lg:py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Grow your habits.{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Track your money.
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Take control of your spending and build better habits with clean,
              intuitive tracking that actually motivates you to save.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="text-lg px-8 py-6 rounded-2xl hover:bg-muted transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                See how it works
              </Button>
            </div>

            <div className="mt-12 text-sm text-muted-foreground">
              <p>✓ Free forever for individuals</p>
              <p>✓ No credit card required</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              <Image
                src={appMockupLaptop}
                alt="Growthub app dashboard on laptop"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Decorative gradient orb */}
            <div className="absolute top-1/4 -right-8 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
