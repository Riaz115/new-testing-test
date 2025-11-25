import { EmployeeTile } from '../EmployeeTile/EmployeeTile';

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
}

interface EmployeeTileGridProps {
  employees: Employee[];
  onEmployeeClick: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onFlag: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const EmployeeTileGrid = ({
  employees,
  onEmployeeClick,
  onEdit,
  onFlag,
  onDelete,
}: EmployeeTileGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {employees.map((employee) => (
        <EmployeeTile
          key={employee.id}
          employee={employee}
          onClick={() => onEmployeeClick(employee)}
          onEdit={() => onEdit(employee)}
          onFlag={() => onFlag(employee)}
          onDelete={() => onDelete(employee)}
        />
      ))}
    </div>
  );
};
