import { useState } from 'react';
import { MoreVertical, Edit, Flag, Trash2 } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  age: number;
  class: string;
  attendance: number;
  role: string;
  flagged: boolean;
}

interface EmployeeTileProps {
  employee: Employee;
  onClick: () => void;
  onEdit: () => void;
  onFlag: () => void;
  onDelete: () => void;
}

export const EmployeeTile = ({ employee, onClick, onEdit, onFlag, onDelete }: EmployeeTileProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuAction = (action: () => void) => {
    action();
    setShowMenu(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200">
      <div className="p-6 cursor-pointer" onClick={onClick}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{employee.name}</h3>
            <p className="text-sm text-gray-600">{employee.email}</p>
          </div>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuAction(onEdit);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuAction(onFlag);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Flag className="w-4 h-4" />
                    {employee.flagged ? 'Unflag' : 'Flag'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuAction(onDelete);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Class:</span>
            <span className="text-sm font-medium text-gray-900">{employee.class}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Age:</span>
            <span className="text-sm font-medium text-gray-900">{employee.age}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Attendance:</span>
            <span className="text-sm font-medium text-gray-900">{employee.attendance}%</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              employee.role === 'admin'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {employee.role}
          </span>
          {employee.flagged && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
              Flagged
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
