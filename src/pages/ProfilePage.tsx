import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@apollo/client";
import { UPDATE_EMPLOYEE } from "../services/mutations";
import { ArrowLeft, Mail, Calendar, BookOpen, Edit } from "lucide-react";
import { Button } from "../components/Button/Button";
import { Modal } from "../components/Modal/Modal";
import { EmployeeForm } from "../components/EmployeeForm/EmployeeForm";

interface ProfilePageProps {
  onBack: () => void;
}

export const ProfilePage = ({ onBack }: ProfilePageProps) => {
  const { employee: currentUser } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      setShowEditModal(false);
      window.location.reload();
    },
  });

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
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2 inline" />
            Back
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentUser.name}
                </h2>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{currentUser.email}</span>
                </div>
              </div>
              <Button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
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
                    {currentUser.age} years
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Class
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {currentUser.class}
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
                          currentUser.attendance >= 75
                            ? "bg-green-500"
                            : currentUser.attendance >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${currentUser.attendance}%` }}
                      />
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {currentUser.attendance}%
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
                    {currentUser.subjects.map((subject, index) => (
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
                    Role
                  </label>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      currentUser.role === "admin"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {currentUser.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
        size="lg"
      >
        <EmployeeForm
          employee={currentUser}
          onSubmit={handleUpdateProfile}
          onCancel={() => setShowEditModal(false)}
          isEdit
          isProfile
        />
      </Modal>
    </div>
  );
};
