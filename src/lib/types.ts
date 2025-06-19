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
