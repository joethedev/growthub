import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface BudgetProgressBarProps {
  spent: number;
  budget: number;
  currency?: string;
}

export function BudgetProgressBar({
  spent,
  budget,
  currency = 'DH',
}: BudgetProgressBarProps) {
  const percentage = (spent / budget) * 100;

  const getStatusColor = () => {
    if (percentage <= 75) return 'bg-success';
    if (percentage <= 90) return 'bg-warning';
    return 'bg-destructive';
  };

  const getStatusText = () => {
    if (percentage <= 75) return 'On track';
    if (percentage <= 90) return 'Approaching limit';
    return 'Over budget';
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">
            {spent} / {budget} {currency}
          </span>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              percentage <= 75
                ? 'bg-success-light text-success'
                : percentage <= 90
                ? 'bg-warning-light text-warning'
                : 'bg-destructive-light text-destructive'
            }`}
          >
            {getStatusText()}
          </span>
        </div>
        <div className="space-y-2">
          <Progress value={percentage} className={`${getStatusColor()} h-3`} />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{percentage.toFixed(1)}% used</span>
            <span>
              {budget - spent} {currency} remaining
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
