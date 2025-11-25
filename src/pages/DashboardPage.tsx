import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { LIST_EMPLOYEES } from '../services/queries';
import { DELETE_EMPLOYEE, TOGGLE_FLAG, ADD_EMPLOYEE, UPDATE_EMPLOYEE } from '../services/mutations';
import { useAuth } from '../context/AuthContext';
import { HamburgerMenu } from '../components/HamburgerMenu/HamburgerMenu';
import { HorizontalMenu } from '../components/HorizontalMenu/HorizontalMenu';
import { ViewToggle } from '../components/ViewToggle/ViewToggle';
import { EmployeeGrid } from '../components/EmployeeGrid/EmployeeGrid';
import { EmployeeTileGrid } from '../components/EmployeeTileGrid/EmployeeTileGrid';
import { EmployeeDetail } from '../components/EmployeeDetail/EmployeeDetail';
import { Modal } from '../components/Modal/Modal';
import { EmployeeForm } from '../components/EmployeeForm/EmployeeForm';
import { Pagination } from '../components/Pagination/Pagination';
import { Button } from '../components/Button/Button';
import { Plus, LogOut } from 'lucide-react';

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

export const DashboardPage = () => {
  const { employee: currentUser, logout } = useAuth();
  const [view, setView] = useState<'grid' | 'tile'>('tile');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, loading, refetch } = useQuery(LIST_EMPLOYEES, {
    variables: { page, limit },
    fetchPolicy: 'network-only',
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => refetch(),
  });

  const [toggleFlag] = useMutation(TOGGLE_FLAG, {
    onCompleted: () => refetch(),
  });

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => {
      refetch();
      setShowAddModal(false);
    },
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
      setEditingEmployee(null);
    },
  });

  const handleDelete = async (emp: Employee) => {
    if (confirm(`Are you sure you want to delete ${emp.name}?`)) {
      await deleteEmployee({ variables: { id: emp.id } });
    }
  };

  const handleFlag = async (emp: Employee) => {
    await toggleFlag({ variables: { id: emp.id } });
  };

  const handleAddEmployee = async (data: any) => {
    await addEmployee({
      variables: {
        input: {
          name: data.name,
          email: data.email,
          password: data.password,
          age: data.age,
          class: data.class,
          subjects: data.subjects,
          attendance: data.attendance,
          role: data.role,
        },
      },
    });
  };

  const handleUpdateEmployee = async (data: any) => {
    if (!editingEmployee) return;
    await updateEmployee({
      variables: {
        id: editingEmployee.id,
        input: {
          name: data.name,
          age: data.age,
          class: data.class,
          subjects: data.subjects,
          attendance: data.attendance,
          role: data.role,
        },
      },
    });
  };

  const employees = data?.listEmployees?.employees || [];
  const totalPages = data?.listEmployees?.pages || 1;

  if (selectedEmployee) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <EmployeeDetail
          employee={selectedEmployee}
          onBack={() => setSelectedEmployee(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <HamburgerMenu isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
              <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                {currentUser?.name} ({currentUser?.role})
              </span>
              <Button variant="ghost" onClick={logout} size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <HorizontalMenu activeView={view} onViewChange={setView} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <ViewToggle view={view} onViewChange={setView} />

          {currentUser?.role === 'admin' && (
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : (
          <>
            {view === 'grid' ? (
              <EmployeeGrid
                employees={employees}
                onEmployeeClick={setSelectedEmployee}
              />
            ) : (
              <EmployeeTileGrid
                employees={employees}
                onEmployeeClick={setSelectedEmployee}
                onEdit={setEditingEmployee}
                onFlag={handleFlag}
                onDelete={handleDelete}
              />
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </main>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Employee"
        size="lg"
      >
        <EmployeeForm
          onSubmit={handleAddEmployee}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingEmployee}
        onClose={() => setEditingEmployee(null)}
        title="Edit Employee"
        size="lg"
      >
        {editingEmployee && (
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={handleUpdateEmployee}
            onCancel={() => setEditingEmployee(null)}
            isEdit
          />
        )}
      </Modal>
    </div>
  );
};
