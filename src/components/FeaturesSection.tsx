import { TrendingUp, PieChart, Target, Zap } from 'lucide-react';
import dashboardScreenshot from '../../public/assets/dashboard-screenshot-OKZZxpRM.jpeg';
import appMockupMobile from '../../public/assets/app-mockup-mobile-C6VEiy4Q.jpeg';
import Image from 'next/image';

export const FeaturesSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time spending insights',
      description:
        'See exactly where your money goes with automatic categorization and beautiful visualizations that make sense at a glance.',
      image: dashboardScreenshot,
      direction: 'left' as const,
    },
    {
      icon: PieChart,
      title: 'Custom category tracking',
      description:
        'Create personalized spending categories that match your lifestyle. Track everything from coffee runs to major purchases.',
      image: appMockupMobile,
      direction: 'right' as const,
    },
    {
      icon: Target,
      title: 'Visual progress tracking',
      description:
        'Watch your savings goals come to life with progress bars, milestones, and celebrations that keep you motivated.',
      image: dashboardScreenshot,
      direction: 'left' as const,
    },
    {
      icon: Zap,
      title: 'Habit streaks & motivation',
      description:
        'Build lasting financial habits with streak tracking, achievements, and gentle reminders that make saving feel like a game.',
      image: appMockupMobile,
      direction: 'right' as const,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              take control
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, powerful tools that work together to give you clarity,
            control, and confidence with your money.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                feature.direction === 'right' ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div
                className={
                  feature.direction === 'right' ? 'lg:col-start-2' : ''
                }
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                  {feature.title}
                </h3>

                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {feature.description}
                </p>

                <div className="flex items-center text-primary font-medium">
                  <span>Learn more</span>
                  <TrendingUp className="ml-2 w-4 h-4" />
                </div>
              </div>

              <div
                className={`relative ${
                  feature.direction === 'right' ? 'lg:col-start-1' : ''
                }`}
              >
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8">
                  <Image
                    src={feature.image}
                    alt={`${feature.title} screenshot`}
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
