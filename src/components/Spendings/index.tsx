import React from 'react';

const Spendings = ({ currentSpendings }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mt-10 mb-4">Spendings</h2>
      <div className="space-y-6">
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
    </>
  );
};

export default Spendings;
