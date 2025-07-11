import React, { useState } from 'react';
import { X, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SpendingType } from '@/lib/types';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string | undefined;
  totalBudget: number | undefined;
  totalSpent: number | undefined;
  highestSpending: {
    amount: number | null;
    description: string | null;
    date: string | null;
  } | null;
  spendings: SpendingType[];
}

const ITEMS_PER_PAGE = 5;

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  categoryName,
  totalBudget,
  totalSpent,
  highestSpending,
  spendings,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!isOpen) return null;
  if (
    !categoryName ||
    totalBudget === undefined ||
    totalSpent === undefined ||
    highestSpending === null ||
    spendings === undefined
  ) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
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
        </div>
      </div>
    );
  }
  const progressPercentage = (totalSpent / totalBudget) * 100;
  const totalPages = Math.ceil(spendings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSpendings = spendings.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-MA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleEdit = (spending: SpendingType) => {
    console.log('Edit spending:', spending);
    // Add edit functionality here
  };

  const handleDelete = (spending: SpendingType) => {
    console.log('Delete spending:', spending);
    // Add delete functionality here
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-overlay-in"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] max-h-[90vh] overflow-hidden animate-modal-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2
            id="modal-title"
            className="text-xl font-semibold text-gray-900 font-manrope"
          >
            {categoryName}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Budget Overview */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 font-manrope">
                Budget Progress
              </span>
              <span className="text-sm font-semibold text-gray-900 font-manrope">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>

            <Progress
              value={progressPercentage}
              className="h-3 bg-gray-100"
              style={{
                background: 'rgb(243 244 246)',
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-light rounded-xl p-4">
                <p className="text-sm text-gray-600 font-manrope mb-1">
                  Total Spent
                </p>
                <p className="text-lg font-bold text-gray-900 font-manrope">
                  {formatCurrency(totalSpent)}
                </p>
                <p className="text-xs text-gray-500 font-manrope">
                  of {formatCurrency(totalBudget)} budget
                </p>
              </div>

              <div className="bg-neutral-light rounded-xl p-4">
                <p className="text-sm text-gray-600 font-manrope mb-1">
                  Highest Spending
                </p>
                <p className="text-lg font-bold text-primary font-manrope">
                  {formatCurrency(highestSpending.amount || 0)}
                </p>
                <p className="text-xs text-gray-500 font-manrope">
                  {highestSpending.description || 'No description'} on{' '}
                  {formatDate(highestSpending.date || '')}
                </p>
              </div>
            </div>
          </div>

          {/* Spendings List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 font-manrope">
              Recent Spendings
            </h3>

            {currentSpendings.length > 0 ? (
              <div className="space-y-3">
                {currentSpendings.map((spending) => (
                  <div
                    key={spending.id}
                    className="flex items-center justify-between p-4 bg-neutral-light rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 font-manrope truncate">
                        {spending.description || 'No description'}
                      </h4>
                      <p className="text-sm text-gray-500 font-manrope">
                        {formatDate(spending.createdAt.toString())}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-900 font-manrope">
                        {formatCurrency(spending.amount)}
                      </span>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(spending)}
                          className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary rounded-full"
                          aria-label={`Edit ${
                            spending.description || 'spending'
                          }`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(spending)}
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 rounded-full"
                          aria-label={`Delete ${
                            spending.description || 'spending'
                          }`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 font-manrope">No spendings found</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 font-manrope">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0 disabled:opacity-50 hover:bg-gray-100 rounded-full"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0 disabled:opacity-50 hover:bg-gray-100 rounded-full"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
