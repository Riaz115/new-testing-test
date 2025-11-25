import { Users, LayoutGrid, Settings } from 'lucide-react';

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

const MenuItem = ({ label, icon, active, onClick }: MenuItemProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

interface HorizontalMenuProps {
  activeView: 'grid' | 'tile';
  onViewChange: (view: 'grid' | 'tile') => void;
}

export const HorizontalMenu = ({ activeView, onViewChange }: HorizontalMenuProps) => {
  return (
    <nav className="hidden lg:flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-sm">
      <MenuItem
        label="Employees"
        icon={<Users className="w-5 h-5" />}
        active={false}
        onClick={() => {}}
      />
      <MenuItem
        label="Grid View"
        icon={<LayoutGrid className="w-5 h-5" />}
        active={activeView === 'grid'}
        onClick={() => onViewChange('grid')}
      />
      <MenuItem
        label="Tile View"
        icon={<LayoutGrid className="w-5 h-5" />}
        active={activeView === 'tile'}
        onClick={() => onViewChange('tile')}
      />
      <MenuItem
        label="Settings"
        icon={<Settings className="w-5 h-5" />}
        active={false}
        onClick={() => {}}
      />
    </nav>
  );
};
