'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const PeriodSchema = z.object({
  startDate: z.string().min(1),
  endDate: z.string().min(1),
});

export async function addPeriod(data: z.infer<typeof PeriodSchema>) {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  const parsed = PeriodSchema.safeParse(data);
  if (!parsed.success) throw new Error('Invalid data');

  const { startDate, endDate } = parsed.data;

  await prisma.period.create({
    data: {
      userId: user.id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      isCurrent: false,
    },
  });

  revalidatePath('/');
}
