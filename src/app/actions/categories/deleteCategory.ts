'use server';

import { prisma } from '@/lib/prisma';

export async function deleteCategoryById(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    console.log('✅ Category deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting category:', error);
    throw error;
  }
}
