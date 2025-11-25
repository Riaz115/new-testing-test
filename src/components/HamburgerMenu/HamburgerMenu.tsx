import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { LogOut, Settings, User, Edit } from "lucide-react";

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
}

export const HamburgerMenu = ({
  isOpen,
  onToggle,
  onSettingsClick,
  onProfileClick,
}: HamburgerMenuProps) => {
  const { logout, employee } = useAuth();
  const [expandedSettings, setExpandedSettings] = useState(false);

  return (
    <>
      <button
        onClick={onToggle}
        className="p-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors lg:hidden text-gray-900 dark:text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onToggle}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-gray-800 dark:to-gray-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-blue-800 dark:hover:bg-gray-700 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {employee && (
            <p className="text-sm text-blue-100 dark:text-gray-300">
              {employee.name}
            </p>
          )}
        </div>

        <div className="p-4 space-y-2">
          <div>
            <button
              onClick={() => setExpandedSettings(!expandedSettings)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Settings
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
                  expandedSettings ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSettings && (
              <div className="ml-8 mt-1 space-y-1">
                <button
                  onClick={() => {
                    onProfileClick();
                    onToggle();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    onSettingsClick();
                    onToggle();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              logout();
              onToggle();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
