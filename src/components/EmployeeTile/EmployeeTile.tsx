import { useState } from "react";
import { MoreVertical, Eye, Edit, Flag, Trash2 } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  age: number;
  class: string;
  attendance: number;
  role: string;
  flagged: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface EmployeeTileProps {
  employee: Employee;
  onClick: () => void;
  onView?: () => void;
  onEdit?: () => void;
  onFlag?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

export const EmployeeTile = ({
  employee,
  onClick,
  onView,
  onEdit,
  onFlag,
  onDelete,
  isAdmin = false,
}: EmployeeTileProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuAction = (action: () => void) => {
    action();
    setShowMenu(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-6 cursor-pointer" onClick={onClick}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {employee.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {employee.email}
            </p>
          </div>
          {onView && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                    }}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
                    {onView && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuAction(onView);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    )}
                    {isAdmin && onEdit && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuAction(onEdit);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    )}
                    {isAdmin && onFlag && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuAction(onFlag);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Flag className="w-4 h-4" />
                        {employee.flagged ? "Unflag" : "Flag"}
                      </button>
                    )}
                    {isAdmin && onDelete && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuAction(onDelete);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Class:
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {employee.class}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Age:
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {employee.age}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Attendance:
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {employee.attendance}%
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span
            className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
              employee.role === "admin"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white shadow-md"
                : "bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white shadow-md"
            }`}
          >
            {employee.role}
          </span>
          <span
            className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
              employee.flagged
                ? "bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 text-white shadow-md"
                : "bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white shadow-md"
            }`}
          >
            {employee.flagged ? "Flag" : "Active"}
          </span>
        </div>
      </div>
    </div>
  );
};
