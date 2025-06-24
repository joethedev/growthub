'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

const SpendingSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

export type SpendingWithCategory = Prisma.SpendingGetPayload<{
  include: { category: true };
}>;

export async function getSpendings() {
  const authUser = await currentUser();
  const parsed = SpendingSchema.safeParse({ userId: authUser?.id });

  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((e) => e.message).join(', ');
    throw new Error(errorMessages);
  }

  const spendings: SpendingWithCategory[] = await prisma.spending.findMany({
    where: {
      category: {
        userId: parsed.data.userId,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  //   console.table(spendings);

  return spendings;
}
