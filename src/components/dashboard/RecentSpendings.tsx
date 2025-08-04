import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface Spending {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  categoryColor: string;
}

interface RecentSpendingsProps {
  spendings: Spending[];
  currency?: string;
}

export function RecentSpendings({
  spendings,
  currency = 'DH',
}: RecentSpendingsProps) {
  if (spendings.length === 0) {
    return (
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Recent Spendings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No spendings yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your recent transactions will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Recent Spendings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {spendings.slice(0, 10).map((spending) => (
            <div
              key={spending.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{spending.description}</p>
                  <Badge
                    variant="secondary"
                    className="text-xs"
                    style={{
                      backgroundColor: `${spending.categoryColor}20`,
                      color: spending.categoryColor,
                    }}
                  >
                    {spending.category}
                  </Badge>
                </div>
                {/* <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(spending.date, { addSuffix: true })}
                </p> */}
              </div>
              <div className="text-right">
                <p className="font-semibold text-destructive">
                  -{spending.amount} {currency}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
