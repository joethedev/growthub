'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTransition } from 'react';
import { addCategory } from '@/app/actions/addCategory';
import { getUserCategories } from '@/app/actions/getUserCategories';
import toast from 'react-hot-toast';
import { addSpending } from '@/app/actions/spendings/addSpending';
import { deleteCategoryById } from '@/app/actions/categories/deleteCategory';
import { editCategory } from '@/app/actions/categories/editCategory';
import CategoryCard from '@/components/CategoryCard';
import { DatePicker } from '@/components/ui/DatePicker';
import CategoryModal from '@/components/CategoryModal';
import { CategorySpendings } from '@/lib/types';
import { getSpendingsByCategory } from '@/app/actions/spendings/getSpendingsByCategory';
import { getSpendings } from '@/app/actions/spendings/getSpendings';

type Category = {
  id: string;
  name: string;
  budget: number;
  color: string;
  createdAt: string;
  amount: number;
};

export default function SpendingPage() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isAddSpending, setIsAddSpending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [color, setColor] = useState('#ff0000');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catSpendings, setCatSpendings] = useState<CategorySpendings | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
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
  }, []);

  const handleEditCategory = (category: Category) => {
    console.log('Editing category with ID:', category.id);
    setEditingCategory(category);
    setShowEditModal(true);
  };

  const handleDeleteCategory = async (category: Category) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    startTransition(async () => {
      try {
        console.log('Deleting category with ID:', category.id);
        deleteCategoryById(category.id);
        toast.success('Category deleted successfully!!!!!');
        setShowEditModal(false);
        setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
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
        await addSpending(formData);
        toast.success('Spending added!');
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

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        console.log('Submitting category...');
        await editCategory(formData);
        toast.success('Category edited!');
        setShowEditModal(false);
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

  const handleOpenCategory = (categoryId: string) => {
    setIsModalOpen(true);
    startTransition(async () => {
      try {
        const categorySpendings = await getSpendingsByCategory(categoryId);
        await getSpendings();
        setCatSpendings(categorySpendings);
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
  function handleOnCloseCategoryModal(): void {
    setIsModalOpen(false);
    setCatSpendings(null);
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 mt-[70px]">
      <div className="flex justify-between mb-10">
        <div className="flex flex-col w-full gap-2">
          <button
            onClick={() => {
              setIsAddSpending(true);
              setShowModal(true);
            }}
            className="w-full text-green-300 px-4 py-2 rounded-lg shadow border-2 border-green-300 hover:bg-green-300 hover:text-white transition"
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
      {loading ? (
        <div className="flex justify-center items-center mt-7">
          <svg
            className="animate-spin h-6 w-6 text-blue-500"
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
      ) : (
        <div className="flex flex-col gap-4 ">
          {categories.map((category) => (
            <div key={category.id} className="flex-shrink-0 w-full">
              <CategoryCard
                id={category.id}
                name={category.name}
                color={category.color}
                budget={category.budget}
                spent={category.amount}
                currency="MAD"
                onClick={() => handleOpenCategory(category.id)}
                onEdit={() => handleEditCategory(category)}
                onDelete={() => handleDeleteCategory(category)}
              />
            </div>
          ))}
        </div>
      )}

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
                <DatePicker
                  onChange={(date: Date | undefined) => setDate(date)}
                />
                <input
                  type="hidden"
                  name="createdAt"
                  placeholder="Created At"
                  value={date?.toString() || ''}
                />
                <button
                  type="submit"
                  className="bg-green-200 w-full text-black px-4 py-2 rounded-lg shadow hover:bg-green-300 transition"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex justify-center items-center m-3">
                      <svg
                        className="animate-spin h-6 w-6 text-blue-500"
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
                  ) : (
                    'Add Category'
                  )}
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
                  type="number"
                  name="budget"
                  placeholder="Budget"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
                />
                <input
                  type="color"
                  value={color}
                  onChange={handleChange}
                  className="w-16 h-10 p-0 border-none rounded cursor-pointer"
                />
                <p className="mt-2">Selected color: {color}</p>
                <input
                  type="hidden"
                  value={color}
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

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowEditModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Editing Category</h2>
            <form
              onSubmit={handleEditSubmit}
              className="space-y-4 max-w-sm mx-auto mt-10"
            >
              <input
                name="categoryId"
                defaultValue={editingCategory?.id || ''}
                type="hidden"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
              />
              <input
                name="name"
                defaultValue={editingCategory?.name || ''}
                placeholder="Name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
              />
              <input
                type="number"
                name="budget"
                defaultValue={editingCategory?.budget || ''}
                placeholder="Budget"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
              />
              <input
                type="color"
                defaultValue={editingCategory?.color || '#ff0000'}
                onChange={handleChange}
                className="w-16 h-10 p-0 border-none rounded cursor-pointer"
              />
              <p className="mt-2">
                Selected color: {editingCategory?.color || '#ff0000'}
              </p>
              <input
                type="hidden"
                defaultValue={editingCategory?.color || '#ff0000'}
                name="color"
                placeholder="#HEXCOLOR"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 transition bg-white text-gray-900 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-green-200 w-full text-black px-4 py-2 rounded-lg shadow hover:bg-green-300 transition"
                disabled={isPending}
              >
                {isPending ? 'Editing...' : 'Edit Category'}
              </button>
              <button
                onClick={() => {
                  handleDeleteCategory(editingCategory as Category);
                }}
                className="bg-red-500 w-full text-white px-4 py-2 rounded-lg shadow hover:bg-red-800 transition"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => handleOnCloseCategoryModal()}
        categoryName={catSpendings?.categoryName}
        totalBudget={catSpendings?.totalBudget}
        totalSpent={catSpendings?.totalSpent}
        highestSpending={catSpendings && catSpendings.highestSpending}
        spendings={(catSpendings && catSpendings.spendings) || []}
      />
    </div>
  );
}
