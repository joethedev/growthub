'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

const SpendingSchema = z.object({
  amount: z.number().min(1, 'Amount is required'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().min(1, 'You must select a category'),
  createdAt: z.date().optional(),
});

export async function addSpending(formData: FormData) {
  const authUser = await currentUser();
  const createdAtRaw = formData.get('createdAt');
  console.log('Created At Raw:', createdAtRaw);
  const raw = {
    amount: Number(formData.get('amount')),
    description: formData.get('description'),
    categoryId: formData.get('category'),
    createdAt:
      typeof createdAtRaw === 'string' && createdAtRaw
        ? new Date(createdAtRaw)
        : undefined,
  };

  const parsed = SpendingSchema.safeParse(raw);

  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((e) => e.message).join('\n');
    throw new Error(errorMessages);
  }

  await prisma.spending.create({ data: parsed.data });
}
