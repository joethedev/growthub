import { AlertTriangle, Eye, Target } from 'lucide-react';

export const ProblemSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: 'Messy budgets',
      description:
        'Complicated spreadsheets and confusing categories make tracking a chore',
    },
    {
      icon: Eye,
      title: 'No visibility on habits',
      description:
        "You can't improve what you can't see - hidden spending patterns sabotage your goals",
    },
    {
      icon: Target,
      title: 'No motivation to save',
      description:
        "Without clear progress and milestones, it's easy to give up on financial goals",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Why most people fail to control their spending
        </h2>

        <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
          Traditional budgeting tools are complex, overwhelming, and don't
          address the real behavioral patterns behind your money habits.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-sm border hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <problem.icon className="w-8 h-8 text-destructive" />
              </div>

              <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                {problem.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
