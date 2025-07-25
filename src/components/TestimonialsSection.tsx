import { Star } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Designer',
      avatar: 'SC',
      quote:
        'Saved 20% more this month thanks to Growthub! The visual progress tracking actually makes me excited to check my budget.',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Software Engineer',
      avatar: 'MJ',
      quote:
        "Love the clean interface and how it keeps me on track. Finally, a money app that doesn't feel overwhelming or judgmental.",
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      avatar: 'ER',
      quote:
        "The habit streaks feature changed everything for me. I've been consistent with my savings goals for 3 months straight now!",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Loved by thousands of users
          </h2>

          <p className="text-xl text-muted-foreground">
            Join the community of people taking control of their financial
            future
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <blockquote className="text-card-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>

                <div>
                  <div className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="font-medium">4.9/5 from 2,847 reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};
