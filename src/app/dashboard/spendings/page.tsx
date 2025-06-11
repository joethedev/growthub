import { Pencil, Trash2 } from 'lucide-react'

type Category = {
  id: string
  name: string
  amount: number
  budget: number
}

const categories: Category[] = [
  { id: '1', name: 'Groceries', amount: 120, budget: 200 },
  { id: '2', name: 'Fitness', amount: 60, budget: 100 },
  { id: '3', name: 'Books', amount: 30, budget: 50 },
]

export default function SpendingPage() {
  

  return (
   <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 w-full">
              <span className="font-medium text-gray-800 w-full sm:w-1/3">{cat.name}</span>
              <span className="text-gray-600 w-full sm:w-1/3">Amount: ${cat.amount}</span>
              <span className="text-gray-600 w-full sm:w-1/3">Budget: ${cat.budget}</span>
            </div>
            <div className="flex gap-2 ml-4">
              <button className="text-blue-600 hover:text-blue-800">
                <Pencil size={18} />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
