'use client'

import { useState } from 'react'
import { Pencil, Trash2, X } from 'lucide-react'
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { addCategory } from "@/app/actions/addCategory";
import toast from "react-hot-toast";

type Category = {
  id: string
  name: string
  amount: number
  budget: number
}

const categories: Category[] = [
  { id: '1', name: 'Groceries', amount: 120, budget: 200 },
  { id: '2', name: 'Fitness', amount: 60, budget: 100 },
  { id: '3', name: 'Books', amount: 40, budget: 50 },
]

export default function SpendingPage() {
  const [showModal, setShowModal] = useState(false)
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
    <div className="w-full max-w-3xl mx-auto p-4 mt-[70px]">
      
      <div className='flex justify-between mb-10'>
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <button
        onClick={() => setShowModal(true)}
        className="bg-green-200 text-black px-4 py-2 rounded-lg shadow hover:bg-green-300 transition"
      >
        + Add Category
      </button>
      </div>
      

      {/* Header Row */}
      <div className="grid grid-cols-4 sm:grid-cols-4 font-medium text-white border-b border-gray-300 pb-2 mb-2">
        <span className='ml-[16px]'>Name</span>
        <span>Amount</span>
        <span>Budget</span>
        <span className="col-span-2 sm:col-span-1 text-right mr-[16px]">Actions</span>
      </div>

      {/* Data Rows */}
      <div className="flex flex-col gap-2">
        {categories.map((cat) => {
        const percent = Math.min((cat.amount / cat.budget) * 100, 100)
        return (
            <div key={cat.id} className="relative">
              {/* Background track */}
              <div className="h-full absolute inset-0 bg-gray-200 rounded-lg" />
              {/* Progress fill */}
              <div
                className="h-full absolute inset-y-0 left-0 bg-green-300 rounded-lg transition-all"
                style={{ width: `${percent}%` }}
              />
              {/* Content */}
              <div className="relative grid grid-cols-4 sm:grid-cols-4 items-center px-4 py-2">
                <span className="font-medium text-gray-800">{cat.name}</span>
                <span className="text-gray-700">${cat.amount}</span>
                <span className="text-gray-700">${cat.budget}</span>
                <div className="col-span-2 sm:col-span-1 flex justify-end gap-2">
                  <button className="text-blue-600 hover:text-blue-800" title="Edit">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div> 
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <input
        name="name"
        placeholder="Name"
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
      />
      <input
        name="description"
        placeholder="Description"
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
      />
      <input
      type='number'
        name="budget"
        placeholder="Budget"
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
      />
      <input
        name="color"
        placeholder="#HEXCOLOR"
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Category"}
      </button>
    </form>
          </div>
        </div>
      )}     
    </div>
  )
}