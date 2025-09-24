'use client';

import Link from 'next/link';
import { Category } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryPillProps {
  category: Category;
  className?: string;
}

export function CategoryPill({ category, className = '' }: CategoryPillProps) {
  return (
    <Link href={`/categories/${category.id}`}>
      <Card className={`group hover:shadow-md transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-white border border-gray-200 ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
            {category.icon}
          </div>
          <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {category.productCount.toLocaleString()} items
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}