'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import { useTransition } from 'react';
import { addCategory } from '@/app/actions/addCategory';
import { getUserCategories } from '@/app/actions/getUserCategories';
import toast from 'react-hot-toast';
import { addSpending } from '@/app/actions/spendings/addSpending';
import { getSpendings } from '@/app/actions/spendings/getSpendings';
import { SpendingWithCategory } from '@/app/actions/spendings/getSpendings';
import { deleteCategoryById } from '@/app/actions/categories/deleteCategory';

const ITEMS_PER_PAGE = 10;

type Category = {
  id: string;
  userId: string;
  name: string;
  description: string;
  budget: number;
  color: string;
  createdAt: string;
  amount: number;
};

export default function SpendingPage() {
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isAddSpending, setIsAddSpending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [spendings, setSpendings] = useState<SpendingWithCategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(spendings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSpendings = spendings.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const fetchSpendings = async () => {
    try {
      const data = await getSpendings();
      console.log('Fetched spendings:', data);
      setSpendings(data);
    } catch (err: unknown) {
      console.error('Failed to fetch spendings:', err);
      toast.error('Failed to load spendings.');
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getUserCategories();
      setCategories(data);
    } catch (err: unknown) {
      console.error('Failed to fetch categories:', err);
      toast.error('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSpendings();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    startTransition(async () => {
      try {
        console.log('Deleting category with ID:', id);
        deleteCategoryById(id);
        toast.success('Category deleted successfully!!!!!');
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      } catch (err: unknown) {
        console.error('Failed to delete category:', err);
        if (err instanceof Error) {
          toast.error(err.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong');
        }
      }
    });
  };

  const handleSpendingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        console.log('Submitting spending...');
        await addSpending(formData);
        toast.success('Spending added!');
        setShowModal(false);
        await fetchCategories();
        await fetchSpendings();
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong');
        }
      }
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        console.log('Submitting category...');
        await addCategory(formData);
        toast.success('Category added!');
        setShowModal(false);
        await fetchCategories();
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong');
        }
      }
    });
  };
  return (
    <div className="w-full max-w-3xl mx-auto p-4 mt-[70px]">
      <div className="flex justify-between mb-10">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsAddSpending(true);
              setShowModal(true);
            }}
            className=" text-green-300 px-4 py-2 rounded-lg shadow border-2 border-green-300 hover:bg-green-300 hover:text-white transition"
          >
            + Add Spending
          </button>
          <button
            onClick={() => {
              setIsAddSpending(false);
              setShowModal(true);
            }}
            className="bg-green-200 text-black px-4 py-2 rounded-lg shadow hover:bg-green-300 transition"
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-4 sm:grid-cols-4 font-medium text-black border-b border-gray-300 pb-2 mb-2">
        <span className="ml-[16px]">Name</span>
        <span>Amount</span>
        <span>Budget</span>
        <span className="col-span-2 sm:col-span-1 text-right mr-[16px]">
          Actions
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-7">
          <svg
            className="animate-spin h-6 w-6 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      ) : categories.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <span className="text-gray-500">No categories found.</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((cat) => {
            const rawPercent = (cat.amount / cat.budget) * 100;
            const percent = Math.min(rawPercent, 100);
            const progressColor =
              rawPercent > 100 ? 'bg-red-500' : 'bg-green-300';
            const textColor = rawPercent > 100 ? 'text-white' : 'text-gray-700';
            return (
              <div key={cat.id} className="relative">
                {/* Background track */}
                <div className="h-full absolute inset-0 bg-gray-200 rounded-lg" />
                {/* Progress fill */}
                <div
                  className={`h-full absolute inset-y-0 left-0 ${progressColor} rounded-lg transition-all`}
                  style={{ width: `${percent}%` }}
                />
                {/* Content */}
                <div className="relative grid grid-cols-4 sm:grid-cols-4 text-[20px] items-center px-4 py-2 hover:scale-103 hover:cursor-pointer">
                  <span className={`${textColor}`}>{cat.name}</span>
                  <span className={`${textColor}`}>${cat.amount}</span>
                  <span className={`${textColor}`}>${cat.budget}</span>
                  <div className="col-span-2 sm:col-span-1 flex justify-end gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2
                        size={18}
                        onClick={() => handleDeleteCategory(cat.id)}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Categories List */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Spendings</h2>
      <div className="space-y-6">
        {/* Grid of Spendings */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {currentSpendings.map((spending) => (
            <div
              key={spending.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className="text-sm font-medium px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: spending.category.color,
                    color: '#fff',
                  }}
                >
                  {spending.category.name}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(spending.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-lg font-semibold text-gray-800">
                {spending.amount.toLocaleString()} MAD
              </p>
              <p className="text-sm text-gray-600">{spending.description}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
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

            <h2 className="text-xl font-semibold mb-4">
              {isAddSpending ? 'Add Spending' : 'Create new category'}
            </h2>
            {isAddSpending ? (
              <form
                onSubmit={handleSpendingSubmit}
                className="space-y-4 max-w-sm mx-auto mt-10"
              >
                <input
                  name="amount"
                  type="number"
                  placeholder="Amount"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
                />
                <input
                  name="description"
                  type="text"
                  placeholder="Description"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
                />
                <select
                  name="category"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-green-200 w-full text-black px-4 py-2 rounded-lg shadow hover:bg-green-300 transition"
                  disabled={isPending}
                >
                  {isPending ? 'Adding...' : 'Add Category'}
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-sm mx-auto mt-10"
              >
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
                  type="number"
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
                  className="bg-green-200 w-full text-black px-4 py-2 rounded-lg shadow hover:bg-green-300 transition"
                  disabled={isPending}
                >
                  {isPending ? 'Adding...' : 'Add Category'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
