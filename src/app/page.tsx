'use client';

import { useState } from 'react';
import { NavigationBar } from '@/components/marketplace/navigation-bar';
import { CategoryPill } from '@/components/marketplace/category-pill';
import { ProductCard } from '@/components/marketplace/product-card';
import { Button } from '@/components/ui/button';
import { categories, products, Product } from '@/lib/mock-data';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product.title);
    // In real implementation, this would update cart state/context
  };

  const handleToggleFavorite = (product: Product) => {
    console.log('Toggle favorite:', product.title);
    // In real implementation, this would update favorites state
  };

  const featuredCategories = categories.filter(cat => cat.featured);
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar onSearch={handleSearch} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Universal Marketplace
          </h1>
          <Button size="lg" className="rounded-full px-8">
            Start Selling
          </Button>
        </div>

        {/* Categories Grid */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {featuredCategories.map((category) => (
              <CategoryPill key={category.id} category={category} />
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" size="sm">
              More
            </Button>
          </div>
        </section>

        {/* Search Results or Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
            </h2>
            {!searchQuery && (
              <Button variant="ghost" size="sm">
                View All
              </Button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products found matching your search.</p>
              <Button onClick={() => handleSearch('')} variant="outline">
                View All Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(searchQuery ? filteredProducts : featuredProducts).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </section>

        {/* Additional Categories */}
        {!searchQuery && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">More Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.filter(cat => !cat.featured).map((category) => (
                <CategoryPill key={category.id} category={category} className="md:col-span-1" />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}