'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  budget: z.number().min(1, 'Budget is required'),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex code'),
});

export async function addCategory(formData: FormData) {
  const authUser = await currentUser();
  const userId = authUser?.id;

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const raw = {
    name: formData.get('name'),
    budget: Number(formData.get('budget')),
    color: formData.get('color'),
  };

  const parsed = CategorySchema.safeParse(raw);

  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((e) => e.message).join(', ');
    throw new Error(errorMessages);
  }

  // 🔍 Check for current period for the user
  const currentPeriod = await prisma.period.findFirst({
    where: {
      userId,
      isCurrent: true,
    },
  });

  let periodId: string;

  if (currentPeriod) {
    periodId = currentPeriod.id;
  } else {
    // 🆕 If no current period, create one starting today with default 1-month duration
    const newPeriod = await prisma.period.create({
      data: {
        userId,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isCurrent: true,
      },
    });

    periodId = newPeriod.id;
  }

  await prisma.category.create({
    data: {
      ...parsed.data,
      periodId,
    },
  });
}
