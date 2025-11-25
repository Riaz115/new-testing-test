import { LayoutGrid, LayoutList } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'tile';
  onViewChange: (view: 'grid' | 'tile') => void;
}

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
          view === 'grid'
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <LayoutList className="w-4 h-4" />
        <span className="hidden sm:inline">Grid</span>
      </button>
      <button
        onClick={() => onViewChange('tile')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
          view === 'tile'
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="hidden sm:inline">Tiles</span>
      </button>
    </div>
  );
};
