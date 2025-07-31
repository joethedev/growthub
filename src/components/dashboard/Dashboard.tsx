import { BudgetProgressBar } from './BudgetProgressBar';
// import { SpendingChart } from "./SpendingChart";
// import { RecentSpendings } from "./RecentSpendings";
// import { OverBudgetAlerts } from "./OverBudgetAlerts";
// import { DailySpendingChart } from "./DailySpendingChart";

// Mock data for demonstration
const mockData = {
  budget: {
    spent: 1250,
    total: 1500,
  },
  spendingByCategory: [
    { category: 'Food', amount: 450, color: '#3b82f6' },
    { category: 'Transport', amount: 200, color: '#10b981' },
    { category: 'Shopping', amount: 350, color: '#f59e0b' },
    { category: 'Entertainment', amount: 150, color: '#ef4444' },
    { category: 'Bills', amount: 100, color: '#8b5cf6' },
  ],
  recentSpendings: [
    {
      id: '1',
      description: 'Grocery shopping',
      amount: 85,
      date: new Date(2024, 6, 30),
      category: 'Food',
      categoryColor: '#3b82f6',
    },
    {
      id: '2',
      description: 'Uber ride',
      amount: 25,
      date: new Date(2024, 6, 29),
      category: 'Transport',
      categoryColor: '#10b981',
    },
    {
      id: '3',
      description: 'Coffee shop',
      amount: 12,
      date: new Date(2024, 6, 29),
      category: 'Food',
      categoryColor: '#3b82f6',
    },
    {
      id: '4',
      description: 'Movie tickets',
      amount: 45,
      date: new Date(2024, 6, 28),
      category: 'Entertainment',
      categoryColor: '#ef4444',
    },
    {
      id: '5',
      description: 'New shirt',
      amount: 120,
      date: new Date(2024, 6, 27),
      category: 'Shopping',
      categoryColor: '#f59e0b',
    },
  ],
  categories: [
    { category: 'Food', budget: 400, spent: 450, color: '#3b82f6' },
    { category: 'Transport', budget: 250, spent: 200, color: '#10b981' },
    { category: 'Shopping', budget: 300, spent: 350, color: '#f59e0b' },
    { category: 'Entertainment', budget: 200, spent: 150, color: '#ef4444' },
    { category: 'Bills', budget: 150, spent: 100, color: '#8b5cf6' },
  ],
  dailySpending: [
    { date: 'Jul 24', amount: 45 },
    { date: 'Jul 25', amount: 120 },
    { date: 'Jul 26', amount: 65 },
    { date: 'Jul 27', amount: 190 },
    { date: 'Jul 28', amount: 85 },
    { date: 'Jul 29', amount: 55 },
    { date: 'Jul 30', amount: 110 },
  ],
};

export function Dashboard() {
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
          spent={mockData.budget.spent}
          budget={mockData.budget.total}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          {/* <div className="space-y-6">
            <SpendingChart data={mockData.spendingByCategory} />
            <OverBudgetAlerts categories={mockData.categories} />
          </div> */}

          {/* Right Column */}
          {/* <div className="space-y-6">
            <RecentSpendings spendings={mockData.recentSpendings} />
            <DailySpendingChart data={mockData.dailySpending} />
          </div> */}
        </div>
      </div>
    </div>
  );
}
