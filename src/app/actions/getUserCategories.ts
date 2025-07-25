'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

const UserSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

export async function getUserCategories() {
  const authUser = await currentUser();
  const parsed = UserSchema.safeParse({ userId: authUser?.id });

  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((e) => e.message).join(', ');
    throw new Error(errorMessages);
  }

  const userId = parsed.data.userId;

  const categories = await prisma.category.findMany({
    where: {
      period: {
        userId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      spendings: {
        select: {
          amount: true,
        },
      },
      period: {
        select: {
          id: true,
          startDate: true,
          endDate: true,
          isCurrent: true,
        },
      },
    },
  });

  return categories.map((cat) => {
    const amount = cat.spendings.reduce((acc, s) => acc + s.amount, 0);
    return {
      ...cat,
      createdAt: cat.createdAt.toISOString(),
      amount,
    };
  });
}
