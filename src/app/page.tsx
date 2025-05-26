import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <main>
      <h1>Hello: {userId}</h1>
    </main>
  );
}
