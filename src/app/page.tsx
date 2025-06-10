import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

type Category = {
  id: string;
  userId: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
};

export default async function Home() {
  const authUser = await currentUser();
  const categories: Category[] = await prisma.category.findMany({
    where: {
      userId: authUser?.id || "",
    },
    orderBy: { createdAt: "desc" },
  });

  console.log("User here:", authUser?.id);
  return (
    <main>
      {authUser && (
        <>
          {categories.map((category) => (
            <div key={category.id}>
              <h2 className={`bg-[${category.color}]`}>{category.name}</h2>
            </div>
          ))}
        </>
      )}
    </main>
  );
}
