'use server';

import { prisma } from '@/lib/prisma'; // adjust path as needed

export async function editCategory(formData: FormData) {
  const id = formData.get('categoryId') as string;
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;
  const budget = parseFloat(formData.get('budget') as string);

  if (!id || !name || !color || isNaN(budget)) {
    throw new Error('Invalid form input');
  }

  await prisma.category.update({
    where: { id },
    data: {
      name,
      color,
      budget,
    },
  });
}
