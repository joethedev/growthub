"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

const UserCategorySchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export async function getUserCategories() {
  const authUser = await currentUser();
  const parsed = UserCategorySchema.safeParse({ userId: authUser?.id });

  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map((e) => e.message).join(", ");
    throw new Error(errorMessages);
  }

  // Fetch categories with total spending amount
  const categories = await prisma.category.findMany({
    where: { userId: parsed.data.userId },
    orderBy: { createdAt: "desc" },
    include: {
      spendings: {
        select: {
          amount: true,
        },
      },
    },
  });

  // Map categories to include sum of spending amounts and format date
  return categories.map((cat) => {
    const amount = cat.spendings.reduce((acc, spend) => acc + spend.amount, 0);
    return {
      ...cat,
      createdAt: cat.createdAt.toISOString(),
      amount,
    };
  });
}
