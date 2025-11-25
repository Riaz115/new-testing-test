import { AlertTriangle, X } from "lucide-react";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
  employeeRole?: string;
}

export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  employeeName,
  employeeRole,
}: DeleteModalProps) => {
  const isAdmin = employeeRole === "admin";
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center py-4">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {isAdmin ? "Delete Admin" : "Delete Employee"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {employeeName}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} className="flex-1">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
