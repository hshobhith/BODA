import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { categories } from '../../data/mockData';

interface CategoryListProps {
  layout?: 'grid' | 'scroll';
}

const CategoryList: React.FC<CategoryListProps> = ({ layout = 'scroll' }) => {
  // Dynamic icon component renderer
  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
    return Icon ? <Icon size={24} className="mb-2" /> : null;
  };

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/search?category=${category.id}`}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-white hover:bg-blue-50 transition-colors text-center"
          >
            <div className="text-blue-600">
              {renderIcon(category.icon)}
            </div>
            <span className="text-sm font-medium text-gray-700">{category.name}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto pb-2 hide-scrollbar space-x-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/search?category=${category.id}`}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-white hover:bg-blue-50 transition-colors text-center flex-shrink-0 w-20"
        >
          <div className="text-blue-600">
            {renderIcon(category.icon)}
          </div>
          <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;