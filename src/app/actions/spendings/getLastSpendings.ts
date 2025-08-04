'use server';

import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma'; // adjust path if different
import { z } from 'zod';

const UserIdSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

export async function getLastSpendings() {
  const authUser = await currentUser();
  const parsed = UserIdSchema.safeParse({ userId: authUser?.id });

  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((e) => e.message).join(', ');
    throw new Error(errorMessages);
  }

  const userId = parsed.data.userId;

  // Get current period for the user
  const period = await prisma.period.findFirst({
    where: {
      userId,
      isCurrent: true,
    },
    include: {
      categories: {
        include: {
          spendings: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 5,
          },
        },
      },
    },
  });

  if (!period) return [];

  // Step 2: Flatten and transform spendings
  const rawSpendings = period.categories.flatMap((category) =>
    category.spendings.map((spending) => ({
      id: spending.id,
      description: spending.description,
      amount: spending.amount,
      date: spending.createdAt,
      category: category.name,
      categoryColor: category.color,
    }))
  );

  // Step 3: Sort globally (since each category had its own 5 most recent spendings)
  const sorted = rawSpendings.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  console.log(
    `Found ${sorted.length} spendings across categories for user ${userId}`
  );

  // Step 4: Return top 5 most recent
  return sorted.slice(0, 5);
}
