'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

const SpendingSchema = z.object({
  amount: z.number().min(1, 'Amount is required'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().min(1, 'You must select a category'),
});

export async function addSpending(formData: FormData) {
  const authUser = await currentUser();
  console.log(`++++++++++++ User here +++++: ${authUser?.id}`);
  const raw = {
    amount: Number(formData.get('amount')),
    description: formData.get('description'),
    categoryId: formData.get('category'),
  };

  console.log(`++++++++++++ Raw data +++++: ${JSON.stringify(raw)}`);

  const parsed = SpendingSchema.safeParse(raw);
  console.log(`++++++++++++ Parsed data +++++: ${JSON.stringify(parsed)}`);

  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((e) => e.message).join(', ');
    throw new Error(errorMessages);
  }

  await prisma.spending.create({ data: parsed.data });
}
