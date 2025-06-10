"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { addCategory } from "@/app/actions/addCategory";
import toast from "react-hot-toast";

export default function AddCategoryPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        console.log("Submitting category...");
        await addCategory(formData);
        toast.success("Category added!");
        router.push("/");
      } catch (err: any) {
        toast.error(err.message || "Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <input
        name="name"
        placeholder="Name"
        className="border px-3 py-2 w-full"
      />
      <input
        name="description"
        placeholder="Description"
        className="border px-3 py-2 w-full"
      />
      <input
        name="color"
        placeholder="#HEXCOLOR"
        className="border px-3 py-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
}
