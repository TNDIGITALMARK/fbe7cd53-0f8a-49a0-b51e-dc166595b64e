'use client';

import Link from 'next/link';
import { Category } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryPillProps {
  category: Category;
  className?: string;
}

export function CategoryPill({ category, className = '' }: CategoryPillProps) {
  // Map category IDs to vibrant color classes
  const getColorClass = (categoryId: string) => {
    const colorMap: { [key: string]: string } = {
      'electronics': 'bg-indigo hover:bg-indigo/90 shadow-violet',
      'fashion': 'bg-pink hover:bg-pink/90 shadow-pink',
      'home-goods': 'bg-emerald hover:bg-emerald/90 shadow-emerald',
      'beauty': 'bg-rose hover:bg-rose/90 shadow-pink',
      'sports': 'bg-orange hover:bg-orange/90 shadow-orange',
      'outdoor': 'bg-teal hover:bg-teal/90 shadow-emerald',
      'books': 'bg-amber hover:bg-amber/90 shadow-orange',
      'toys': 'bg-violet hover:bg-violet/90 shadow-violet',
      'food-drink': 'bg-emerald hover:bg-emerald/90 shadow-emerald',
      'pet-supplies': 'bg-orange hover:bg-orange/90 shadow-orange',
      'automotive': 'bg-teal hover:bg-teal/90 shadow-emerald',
    };
    return colorMap[categoryId] || 'bg-gray-100 hover:bg-gray-200';
  };

  const colorClass = getColorClass(category.id);

  return (
    <Link href={`/categories/${category.id}`}>
      <Card className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 overflow-hidden ${colorClass} ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300 filter drop-shadow-sm">
            {category.icon}
          </div>
          <h3 className="font-semibold text-sm mb-1 transition-all duration-200 text-white">
            {category.name}
          </h3>
          <p className="text-xs opacity-90 text-white/80">
            {category.productCount.toLocaleString()} items
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}