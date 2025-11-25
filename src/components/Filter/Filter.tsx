import { useState } from "react";
import { Filter as FilterIcon, X } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
  isMobile?: boolean;
}

export interface FilterState {
  role: string;
  class: string;
  flagged: string | null;
}

export const Filter = ({ onFilterChange, isMobile = false }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    role: "",
    class: "",
    flagged: null,
  });

  const handleFilterChange = (key: keyof FilterState, value: string | null) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { role: "", class: "", flagged: null };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters =
    filters.role || filters.class || filters.flagged !== null;

  const filterContent = (
    <div
      className={`bg-white rounded-lg shadow-lg border border-gray-200 ${
        isMobile ? "p-4" : "p-6"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            value={filters.role}
            onChange={(e) => handleFilterChange("role", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class
          </label>
          <input
            type="text"
            value={filters.class}
            onChange={(e) => handleFilterChange("class", e.target.value)}
            placeholder="Filter by class"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={
              filters.flagged === null
                ? ""
                : filters.flagged
                ? "flagged"
                : "active"
            }
            onChange={(e) => {
              const value = e.target.value;
              handleFilterChange(
                "flagged",
                value === "" ? null : value === "flagged" ? "true" : "false"
              );
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="flagged">Flagged</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FilterIcon className="w-5 h-5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
              {
                [filters.role, filters.class, filters.flagged !== null].filter(
                  Boolean
                ).length
              }
            </span>
          )}
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={filters.role}
                      onChange={(e) =>
                        handleFilterChange("role", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Roles</option>
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Class
                    </label>
                    <input
                      type="text"
                      value={filters.class}
                      onChange={(e) =>
                        handleFilterChange("class", e.target.value)
                      }
                      placeholder="Filter by class"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={
                        filters.flagged === null
                          ? ""
                          : filters.flagged
                          ? "flagged"
                          : "active"
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        handleFilterChange(
                          "flagged",
                          value === ""
                            ? null
                            : value === "flagged"
                            ? "true"
                            : "false"
                        );
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Status</option>
                      <option value="flagged">Flagged</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return filterContent;
};
