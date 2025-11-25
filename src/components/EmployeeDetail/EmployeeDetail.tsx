import { ArrowLeft, Mail, Calendar, BookOpen, Flag } from 'lucide-react';
import { Button } from '../Button/Button';

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to List
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{employee.name}</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{employee.email}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                employee.role === 'admin'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {employee.role}
            </span>
            {employee.flagged && (
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800 flex items-center gap-1">
                <Flag className="w-3 h-3" />
                Flagged
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Age
              </label>
              <p className="text-lg text-gray-900">{employee.age} years</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Class
              </label>
              <p className="text-lg text-gray-900">{employee.class}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Attendance
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      employee.attendance >= 75
                        ? 'bg-green-500'
                        : employee.attendance >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${employee.attendance}%` }}
                  />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {employee.attendance}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Subjects
              </label>
              <div className="flex flex-wrap gap-2">
                {employee.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Timeline
              </label>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-500">Created:</span>
                  <p className="text-sm text-gray-900">
                    {new Date(employee.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Last Updated:</span>
                  <p className="text-sm text-gray-900">
                    {new Date(employee.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
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
