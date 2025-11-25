import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  startRecord: number;
  endRecord: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalRecords,
  startRecord,
  endRecord,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const limitOptions = [5, 10, 15, 20, 25, 30, 50];

  const visiblePages = pages.filter((page) => {
    if (totalPages <= 7) return true;
    if (page === 1 || page === totalPages) return true;
    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
    return false;
  });

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-blue-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
          Showing{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {startRecord}
          </span>{" "}
          to{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {endRecord}
          </span>{" "}
          of{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {totalRecords}
          </span>{" "}
          total records
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
            Per Page:
          </label>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
          >
            {limitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:border-blue-400 dark:hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-sm hover:shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md font-medium"
              >
                1
              </button>
              {visiblePages[0] > 2 && (
                <span className="px-2 text-gray-500 dark:text-gray-400 font-medium">
                  ...
                </span>
              )}
            </>
          )}

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-sm ${
                currentPage === page
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white shadow-md scale-105"
                  : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md"
              }`}
            >
              {page}
            </button>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-2 text-gray-500 dark:text-gray-400 font-medium">
                  ...
                </span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md font-medium"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:border-blue-400 dark:hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-sm hover:shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
