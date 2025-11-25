import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

interface Employee {
  name: string;
  email: string;
  password?: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
  role: string;
}

interface EmployeeFormProps {
  employee?: Partial<Employee>;
  onSubmit: (data: Employee) => void;
  onCancel: () => void;
  isEdit?: boolean;
  isProfile?: boolean;
}

export const EmployeeForm = ({
  employee,
  onSubmit,
  onCancel,
  isEdit = false,
  isProfile = false,
}: EmployeeFormProps) => {
  const [formData, setFormData] = useState<Employee>({
    name: employee?.name || "",
    email: employee?.email || "",
    password: "",
    age: employee?.age || 18,
    class: employee?.class || "",
    subjects: employee?.subjects || [],
    attendance: employee?.attendance || 0,
    role: employee?.role || "employee",
  });

  const [subjectInput, setSubjectInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addSubject = () => {
    if (
      subjectInput.trim() &&
      !formData.subjects.includes(subjectInput.trim())
    ) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, subjectInput.trim()],
      });
      setSubjectInput("");
    }
  };

  const removeSubject = (subject: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((s) => s !== subject),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        disabled={isEdit || isProfile}
      />

      {!isEdit && !isProfile && (
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      )}

      <Input
        label="Age"
        type="number"
        min="18"
        max="100"
        value={formData.age}
        onChange={(e) =>
          setFormData({ ...formData, age: parseInt(e.target.value) })
        }
        required
      />

      <Input
        label="Class"
        type="text"
        value={formData.class}
        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subjects
        </label>
        <div className="flex gap-2 mb-2">
          <Input
            type="text"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
            placeholder="Add subject"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSubject();
              }
            }}
          />
          <Button type="button" onClick={addSubject} size="md">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.subjects.map((subject) => (
            <span
              key={subject}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium flex items-center gap-2"
            >
              {subject}
              <button
                type="button"
                onClick={() => removeSubject(subject)}
                className="text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <Input
        label="Attendance (%)"
        type="number"
        min="0"
        max="100"
        value={formData.attendance}
        onChange={(e) =>
          setFormData({ ...formData, attendance: parseFloat(e.target.value) })
        }
        required
      />

      {!isProfile && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {isEdit ? "Update" : "Create"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
