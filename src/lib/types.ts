export type Category = {
  id: string;
  userId: string;
  name: string;
  description: string;
  budget: number;
  color: string;
  createdAt: Date;
  amount?: number;
};

export type SpendingType = {
  id: string;
  categoryId: string;
  amount: number;
  description: string;
  createdAt: Date;
};

export type CategorySpendings = {
  categoryName: string;
  totalBudget: number;
  totalSpent: number;
  highestSpending: {
    amount: number;
    description: string;
    date: string;
  } | null;
  spendings: SpendingType[];
};
