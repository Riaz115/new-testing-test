import { EmployeeTile } from "../EmployeeTile/EmployeeTile";

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
  createdAt?: string;
  updatedAt?: string;
}

interface EmployeeTileGridProps {
  employees: Employee[];
  onEmployeeClick: (employee: Employee) => void;
  onView?: (employee: Employee) => void;
  onEdit?: (employee: Employee) => void;
  onFlag?: (employee: Employee) => void;
  onDelete?: (employee: Employee) => void;
  isAdmin?: boolean;
}

export const EmployeeTileGrid = ({
  employees,
  onEmployeeClick,
  onView,
  onEdit,
  onFlag,
  onDelete,
  isAdmin = false,
}: EmployeeTileGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {employees.map((employee) => (
        <EmployeeTile
          key={employee.id}
          employee={employee}
          onClick={() => onEmployeeClick(employee)}
          onView={onView ? () => onView(employee) : undefined}
          onEdit={isAdmin && onEdit ? () => onEdit(employee) : undefined}
          onFlag={isAdmin && onFlag ? () => onFlag(employee) : undefined}
          onDelete={isAdmin && onDelete ? () => onDelete(employee) : undefined}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};
