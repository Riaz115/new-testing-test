import { Flag } from "lucide-react";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";

interface FlagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
  isFlagged: boolean;
  employeeRole?: string;
}

export const FlagModal = ({
  isOpen,
  onClose,
  onConfirm,
  employeeName,
  isFlagged,
  employeeRole,
}: FlagModalProps) => {
  const isAdmin = employeeRole === "admin";
  const roleText = isAdmin ? "Admin" : "Employee";
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center py-4">
        <div
          className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 ${
            isFlagged
              ? "bg-yellow-100 dark:bg-yellow-900/30"
              : "bg-orange-100 dark:bg-orange-900/30"
          }`}
        >
          <Flag
            className={`h-8 w-8 ${
              isFlagged
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-orange-600 dark:text-orange-400"
            }`}
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {isFlagged ? `Unflag ${roleText}` : `Flag ${roleText}`}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to {isFlagged ? "unflag" : "flag"}{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {employeeName}
          </span>
          ?
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant={isFlagged ? "secondary" : "danger"}
            onClick={onConfirm}
            className={`flex-1 ${
              !isFlagged
                ? "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                : ""
            }`}
          >
            {isFlagged ? "Unflag" : "Flag"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
