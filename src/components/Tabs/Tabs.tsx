import { Users, Shield, Flag, CheckCircle } from "lucide-react";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
  const tabs = [
    { id: "all", label: "Employees", icon: <Users className="w-4 h-4" /> },
    { id: "admin", label: "Admins", icon: <Shield className="w-4 h-4" /> },
    { id: "flagged", label: "Flag", icon: <Flag className="w-4 h-4" /> },
    {
      id: "active",
      label: "Active",
      icon: <CheckCircle className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1">
      <div className="flex items-center w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 rounded-md font-medium transition-all whitespace-nowrap text-xs sm:text-sm md:text-base ${
              activeTab === tab.id
                ? "bg-blue-600 dark:bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
