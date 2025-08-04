'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

const UserIdSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

export async function getTotals() {
  const authUser = await currentUser();
  const parsed = UserIdSchema.safeParse({ userId: authUser?.id });

  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((e) => e.message).join(', ');
    throw new Error(errorMessages);
  }

  const userId = parsed.data.userId;

  // Get current period for user
  const currentPeriod = await prisma.period.findFirst({
    where: {
      userId,
      isCurrent: true,
    },
    include: {
      categories: {
        include: {
          spendings: true,
        },
      },
    },
  });

  if (!currentPeriod) {
    return {
      totalBudget: 0,
      totalSpent: 0,
    };
  }

  // Calculate totals
  const totalBudget = currentPeriod.categories.reduce(
    (acc, cat) => acc + cat.budget,
    0
  );

  const totalSpent = currentPeriod.categories.reduce(
    (acc, cat) => acc + cat.spendings.reduce((sum, s) => sum + s.amount, 0),
    0
  );

  return {
    totalBudget,
    totalSpent,
  };
}
