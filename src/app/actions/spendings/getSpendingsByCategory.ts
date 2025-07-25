'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

const SpendingSchema = z.object({
  userId: z.string().min(1),
});

export async function getSpendingsByCategory(categoryId: string) {
  try {
    const authUser = await currentUser();

    const parsed = SpendingSchema.safeParse({ userId: authUser?.id });
    if (!parsed.success) {
      throw new Error('Unauthorized');
    }

    const userId = parsed.data.userId;

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new Error('Category not found or access denied');
    }

    const spendings = await prisma.spending.findMany({
      where: { categoryId },
      orderBy: { createdAt: 'desc' },
    });

    const totalSpent = spendings.reduce((sum, item) => sum + item.amount, 0);

    const highest = spendings.reduce(
      (max, item) => (item.amount > max.amount ? item : max),
      spendings[0] || { amount: 0, description: '', createdAt: new Date() }
    );

    const highestSpending = highest
      ? {
          amount: highest.amount,
          description: highest.description || '',
          date: highest.createdAt.toISOString(),
        }
      : null;

    return {
      categoryName: category.name,
      totalBudget: category.budget,
      totalSpent,
      highestSpending,
      spendings,
    };
  } catch (error) {
    console.error('Error fetching spendings:', error);
    throw new Error('Could not fetch spendings');
  }
}
