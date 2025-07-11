import { EllipsisVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CategoryCardProps {
  id: string;
  name: string;
  color: string;
  budget: number;
  spent: number;
  currency?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  color,
  budget,
  spent,
  currency = 'MAD',
  onEdit,
  onDelete,
  onClick,
}) => {
  const remaining = budget - spent;
  const spentPercentage = (spent / budget) * 100;
  const isOverBudget = spent > budget;

  const handleEdit = () => {
    onEdit?.(id);
  };

  const handleDelete = () => {
    onDelete?.(id);
  };

  return (
    <div
      onClick={() => onClick?.(id)}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
    >
      {/* Header with category name and menu */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <h3 className="font-medium text-gray-900 text-sm">{name}</h3>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-150">
              <EllipsisVertical className="w-4 h-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-32 bg-white border border-gray-200 shadow-lg"
          >
            <DropdownMenuItem
              onClick={handleEdit}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Edit className="w-3 h-3" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Budget information */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Budget:</span>
          <span className="text-xs font-medium text-gray-700">
            {budget} {currency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Spent:</span>
          <span
            className={`text-xs font-medium ${
              isOverBudget ? 'text-red-600' : 'text-gray-700'
            }`}
          >
            {spent} {currency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Remaining:</span>
          <span
            className={`text-xs font-medium ${
              remaining < 0 ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {remaining} {currency}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(spentPercentage, 100)}%`,
              backgroundColor: isOverBudget ? '#ef4444' : color,
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">
            {Math.round(spentPercentage)}% used
          </span>
          {isOverBudget && (
            <span className="text-xs text-red-500 font-medium">
              Over budget!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
