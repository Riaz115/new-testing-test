import { useState } from 'react';
import { Menu, X, ChevronDown, Users, Settings, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  submenu?: { label: string; onClick: () => void }[];
}

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HamburgerMenu = ({ isOpen, onToggle }: HamburgerMenuProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { logout, employee } = useAuth();

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      onClick: () => {}
    },
    {
      label: 'Employees',
      icon: <Users className="w-5 h-5" />,
      submenu: [
        { label: 'All Employees', onClick: () => {} },
        { label: 'Add Employee', onClick: () => {} },
        { label: 'Flagged', onClick: () => {} }
      ]
    },
    {
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      submenu: [
        { label: 'Profile', onClick: () => {} },
        { label: 'Preferences', onClick: () => {} }
      ]
    }
  ];

  const toggleSubmenu = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <>
      <button
        onClick={onToggle}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          {employee && (
            <p className="text-sm text-gray-600 mt-1">{employee.name}</p>
          )}
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => {
                  if (item.submenu) {
                    toggleSubmenu(item.label);
                  } else if (item.onClick) {
                    item.onClick();
                    onToggle();
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                {item.submenu && (
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      expandedItem === item.label ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {item.submenu && expandedItem === item.label && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.label}
                      onClick={() => {
                        subItem.onClick();
                        onToggle();
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 transition-colors"
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => {
              logout();
              onToggle();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors mt-4"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};
