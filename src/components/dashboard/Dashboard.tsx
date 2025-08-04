'use client';

import { useEffect, useState } from 'react';
import { BudgetProgressBar } from './BudgetProgressBar';
import { getTotals } from '@/app/actions/spendings/getTotals';
import toast from 'react-hot-toast';
// import { SpendingChart } from "./SpendingChart";
import { RecentSpendings } from './RecentSpendings';
import { getLastSpendings } from '@/app/actions/spendings/getLastSpendings';
// import { OverBudgetAlerts } from "./OverBudgetAlerts";
// import { DailySpendingChart } from "./DailySpendingChart";

type SpendingWithCategory = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  categoryColor: string;
};

export function Dashboard() {
  const [totals, setTotals] = useState<{
    totalBudget: number;
    totalSpent: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentSpendings, setRecentSpendings] = useState<
    SpendingWithCategory[]
  >([]);

  useEffect(() => {
    fetchTotals();
    fetchRecentSpendings();
  }, []);

  const fetchTotals = async () => {
    try {
      setLoading(true);
      const data = await getTotals();
      setTotals(data);
    } catch (err: unknown) {
      console.error('Failed to fetch totals:', err);
      toast.error('Failed to load totals.');
    } finally {
      setLoading(false);
    }
  };
  const fetchRecentSpendings = async () => {
    try {
      setLoading(true);
      const data = await getLastSpendings();
      setRecentSpendings(data);
    } catch (err: unknown) {
      console.error('Failed to fetch recent spendings:', err);
      toast.error('Failed to load recent spendings.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading totals...</div>;
  // if (!totals) return <div>No totals available</div>;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Growthub Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your financial progress and spending habits
          </p>
        </div>

        {/* Budget Overview */}
        <BudgetProgressBar
          spent={totals?.totalSpent}
          budget={totals?.totalBudget}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          {/* <div className="space-y-6">
            <SpendingChart data={mockData.spendingByCategory} />
            <OverBudgetAlerts categories={mockData.categories} />
          </div> */}

          {/* Right Column */}
          <div className="space-y-6">
            <RecentSpendings spendings={recentSpendings} />
            {/* <DailySpendingChart data={mockData.dailySpending} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
