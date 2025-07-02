'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

const CategorySchema = z.object({
  userId: z.string().min(1, 'Name is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  budget: z.number().min(1, 'Budget is required'),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex code'),
});

export async function addCategory(formData: FormData) {
  const authUser = await currentUser();
  const raw = {
    userId: authUser?.id,
    name: formData.get('name'),
    description: formData.get('description'),
    budget: Number(formData.get('budget')),
    color: formData.get('color'),
  };

  const parsed = CategorySchema.safeParse(raw);

  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((e) => e.message).join(', ');
    throw new Error(errorMessages);
  }

  await prisma.category.create({ data: parsed.data });
}
