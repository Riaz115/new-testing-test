import { ArrowLeft, Mail, Calendar, BookOpen, Flag } from "lucide-react";
import { Button } from "../Button/Button";

interface Employee {
  id: string;
  name: string;
  email: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
  role: string;
  flagged: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EmployeeDetailProps {
  employee: Employee;
  onBack: () => void;
}

export const EmployeeDetail = ({ employee, onBack }: EmployeeDetailProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2 inline" />
          Back to List
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {employee.name}
            </h2>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <span>{employee.email}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span
              className={`px-4 py-2 text-sm font-semibold rounded-full ${
                employee.role === "admin"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white shadow-md"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white shadow-md"
              }`}
            >
              {employee.role}
            </span>
            <span
              className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-1 ${
                employee.flagged
                  ? "bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 text-white shadow-md"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white shadow-md"
              }`}
            >
              {employee.flagged && <Flag className="w-3 h-3" />}
              {employee.flagged ? "Flag" : "Active"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Age
              </label>
              <p className="text-lg text-gray-900 dark:text-white">
                {employee.age} years
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Class
              </label>
              <p className="text-lg text-gray-900 dark:text-white">
                {employee.class}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Attendance
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      employee.attendance >= 75
                        ? "bg-green-500"
                        : employee.attendance >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${employee.attendance}%` }}
                  />
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {employee.attendance}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Subjects
              </label>
              <div className="flex flex-wrap gap-2">
                {employee.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Timeline
              </label>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Created:
                  </span>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(employee.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Last Updated:
                  </span>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(employee.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
