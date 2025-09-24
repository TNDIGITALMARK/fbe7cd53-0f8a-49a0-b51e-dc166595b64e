'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Filter, Grid, List } from 'lucide-react';
import { NavigationBar } from '@/components/marketplace/navigation-bar';
import { ProductCard } from '@/components/marketplace/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { categories, products, Product } from '@/lib/mock-data';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const category = categories.find(c => c.id === categoryId);
  const categoryProducts = products.filter(p => p.category === categoryId);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(categoryProducts);

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <NavigationBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...categoryProducts];

    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(sorted);
  };

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product.title);
  };

  const handleToggleFavorite = (product: Product) => {
    console.log('Toggle favorite:', product.title);
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 capitalize">{category.name}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="text-4xl">{category.icon}</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-gray-600 mt-1">
              {category.productCount.toLocaleString()} items available
            </p>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Sort: {sortBy === 'relevance' ? 'Relevance' :
                          sortBy === 'price-low' ? 'Price: Low to High' :
                          sortBy === 'price-high' ? 'Price: High to Low' :
                          sortBy === 'rating' ? 'Highest Rated' : 'Newest'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleSort('relevance')}>
                  Relevance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('price-low')}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('price-high')}>
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('rating')}>
                  Highest Rated
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('newest')}>
                  Newest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">No products found in this category.</p>
            <Link href="/">
              <Button variant="outline">Browse All Categories</Button>
            </Link>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <Link
                            href={`/products/${product.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-primary"
                          >
                            {product.title}
                          </Link>

                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center">
                              <span className="text-yellow-400">★</span>
                              <span className="text-sm text-gray-600 ml-1">
                                {product.rating} ({product.reviewCount})
                              </span>
                            </div>
                            {product.featured && (
                              <Badge>Featured</Badge>
                            )}
                          </div>

                          <p className="text-gray-600 mt-2 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex items-center justify-between mt-4">
                            <div>
                              <span className="text-2xl font-bold text-gray-900">
                                ${product.price}
                              </span>
                              <p className="text-sm text-gray-600">
                                by {product.seller.name}
                              </p>
                            </div>

                            <Button onClick={() => handleAddToCart(product)}>
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination placeholder */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}