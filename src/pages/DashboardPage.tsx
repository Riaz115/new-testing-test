import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LIST_EMPLOYEES } from "../services/queries";
import {
  DELETE_EMPLOYEE,
  TOGGLE_FLAG,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../services/mutations";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useDebounce } from "../hooks/useDebounce";
import { HamburgerMenu } from "../components/HamburgerMenu/HamburgerMenu";
import { Tabs } from "../components/Tabs/Tabs";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { Loader } from "../components/Loader/Loader";
import { ViewToggle } from "../components/ViewToggle/ViewToggle";
import { EmployeeGrid } from "../components/EmployeeGrid/EmployeeGrid";
import { EmployeeTileGrid } from "../components/EmployeeTileGrid/EmployeeTileGrid";
import { EmployeeDetail } from "../components/EmployeeDetail/EmployeeDetail";
import { ProfilePage } from "./ProfilePage";
import { Modal } from "../components/Modal/Modal";
import { EmployeeForm } from "../components/EmployeeForm/EmployeeForm";
import { DeleteModal } from "../components/DeleteModal/DeleteModal";
import { FlagModal } from "../components/FlagModal/FlagModal";
import { Pagination } from "../components/Pagination/Pagination";
import { Button } from "../components/Button/Button";
import { ToastContainer } from "../components/Toast/Toast";
import { LogOut, UserPlus, Moon, Sun, Settings } from "lucide-react";

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

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

export const DashboardPage = () => {
  const { employee: currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [view, setView] = useState<"grid" | "tile">("tile");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );
  const [employeeToFlag, setEmployeeToFlag] = useState<Employee | null>(null);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [limit, setLimit] = useState(12);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const isAdmin = currentUser?.role === "admin";

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const getQueryVariables = () => {
    const variables: any = {
      page,
      limit,
    };

    if (activeTab === "admin") {
      variables.role = "admin";
    } else if (activeTab === "flagged") {
      variables.flagged = true;
    } else if (activeTab === "active") {
      variables.flagged = false;
    }

    if (debouncedSearch.trim()) {
      variables.search = debouncedSearch.trim();
    }

    return variables;
  };

  const { data, loading, refetch } = useQuery(LIST_EMPLOYEES, {
    variables: getQueryVariables(),
    fetchPolicy: "network-only",
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
      showToast("Employee deleted successfully", "success");
    },
    onError: (error) => {
      showToast(error.message || "Failed to delete employee", "error");
    },
  });

  const [toggleFlag] = useMutation(TOGGLE_FLAG, {
    onCompleted: (data) => {
      refetch();
      const isFlagged = data.toggleFlag.flagged;
      showToast(
        `Employee ${isFlagged ? "flagged" : "unflagged"} successfully`,
        "success"
      );
      setShowFlagModal(false);
      setEmployeeToFlag(null);
    },
    onError: (error) => {
      showToast(error.message || "Failed to toggle flag", "error");
    },
  });

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => {
      refetch();
      setShowAddModal(false);
      showToast("Employee added successfully", "success");
    },
    onError: (error) => {
      showToast(error.message || "Failed to add employee", "error");
    },
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
      setEditingEmployee(null);
      showToast("Employee updated successfully", "success");
    },
    onError: (error) => {
      showToast(error.message || "Failed to update employee", "error");
    },
  });

  const handleDeleteClick = (emp: Employee) => {
    setEmployeeToDelete(emp);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (employeeToDelete) {
      await deleteEmployee({ variables: { id: employeeToDelete.id } });
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
    }
  };

  const handleFlagClick = (emp: Employee) => {
    setEmployeeToFlag(emp);
    setShowFlagModal(true);
  };

  const handleFlagConfirm = async () => {
    if (employeeToFlag) {
      await toggleFlag({ variables: { id: employeeToFlag.id } });
    }
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

  const handleUpdateProfile = async (data: any) => {
    if (!currentUser) return;
    await updateEmployee({
      variables: {
        id: currentUser.id,
        input: {
          name: data.name,
          age: data.age,
          class: data.class,
          subjects: data.subjects,
          attendance: data.attendance,
        },
      },
    });
    setShowProfileModal(false);
    refetch();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const employees = data?.listEmployees?.employees || [];
  const totalPages = data?.listEmployees?.pages || 1;
  const totalRecords = data?.listEmployees?.total || 0;
  const startRecord = totalRecords > 0 ? (page - 1) * limit + 1 : 0;
  const endRecord = Math.min(page * limit, totalRecords);

  if (showProfilePage) {
    return <ProfilePage onBack={() => setShowProfilePage(false)} />;
  }

  if (selectedEmployee) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <EmployeeDetail
          employee={selectedEmployee}
          onBack={() => setSelectedEmployee(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <header className="bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 shadow-lg sticky top-0 z-30 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="lg:hidden">
                <HamburgerMenu
                  isOpen={isMenuOpen}
                  onToggle={() => setIsMenuOpen(!isMenuOpen)}
                  onSettingsClick={() => setShowProfilePage(true)}
                  onProfileClick={() => setShowProfilePage(true)}
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Employee Management
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 transition-all duration-300 text-gray-900 dark:text-white"
                title={
                  theme === "dark"
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
                }
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <Button
                variant="ghost"
                onClick={() => setShowProfilePage(true)}
                size="sm"
                className="text-gray-900 dark:text-white hover:bg-blue-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white hidden lg:flex"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
                {currentUser?.name} ({currentUser?.role})
              </span>
              <Button
                variant="ghost"
                onClick={logout}
                size="sm"
                className="text-gray-900 dark:text-white hover:bg-blue-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <ViewToggle view={view} onViewChange={setView} />
          {isAdmin && (
            <Button
              onClick={() => setShowAddModal(true)}
              className="rounded-full px-3 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
            >
              <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              <span className="hidden xs:inline">Add User</span>
              <span className="xs:hidden">Add</span>
            </Button>
          )}
        </div>

        <div className="mb-6 space-y-4">
          <SearchInput value={searchQuery} onChange={handleSearchChange} />
          <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {employees.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No employees found
                </p>
              </div>
            ) : (
              <>
                {view === "grid" ? (
                  <EmployeeGrid
                    employees={employees}
                    onEmployeeClick={(emp) =>
                      setSelectedEmployee(emp as Employee)
                    }
                    onEdit={
                      isAdmin
                        ? (emp) => setEditingEmployee(emp as Employee)
                        : undefined
                    }
                    onFlag={
                      isAdmin
                        ? (emp) => handleFlagClick(emp as Employee)
                        : undefined
                    }
                    onDelete={
                      isAdmin
                        ? (emp) => handleDeleteClick(emp as Employee)
                        : undefined
                    }
                    isAdmin={isAdmin}
                  />
                ) : (
                  <EmployeeTileGrid
                    employees={employees}
                    onEmployeeClick={(emp) =>
                      setSelectedEmployee(emp as Employee)
                    }
                    onView={(emp) => setSelectedEmployee(emp as Employee)}
                    onEdit={
                      isAdmin
                        ? (emp) => setEditingEmployee(emp as Employee)
                        : undefined
                    }
                    onFlag={
                      isAdmin
                        ? (emp) => handleFlagClick(emp as Employee)
                        : undefined
                    }
                    onDelete={
                      isAdmin
                        ? (emp) => handleDeleteClick(emp as Employee)
                        : undefined
                    }
                    isAdmin={isAdmin}
                  />
                )}

                <div className="mt-6">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    startRecord={startRecord}
                    endRecord={endRecord}
                    limit={limit}
                    onPageChange={setPage}
                    onLimitChange={handleLimitChange}
                  />
                </div>
              </>
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

      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title="Edit Profile"
        size="lg"
      >
        {currentUser && (
          <EmployeeForm
            employee={currentUser}
            onSubmit={handleUpdateProfile}
            onCancel={() => setShowProfileModal(false)}
            isEdit
            isProfile
          />
        )}
      </Modal>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setEmployeeToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        employeeName={employeeToDelete?.name || ""}
        employeeRole={employeeToDelete?.role}
      />

      <FlagModal
        isOpen={showFlagModal}
        onClose={() => {
          setShowFlagModal(false);
          setEmployeeToFlag(null);
        }}
        onConfirm={handleFlagConfirm}
        employeeName={employeeToFlag?.name || ""}
        isFlagged={employeeToFlag?.flagged || false}
        employeeRole={employeeToFlag?.role}
      />
    </div>
  );
};
