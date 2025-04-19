import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import IngredientSearch from '../components/IngredientSearch';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import { useRecipeContext } from '../context/RecipeContext';
import { useSearchRecipes } from '../hooks/useRecipes';
import { List, Grid2X2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
  const { searchParams, viewMode, setViewMode } = useRecipeContext();
  const { data: searchResults, isLoading, isError, error } = useSearchRecipes(searchParams);
  
  const [recipes, setRecipes] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (searchResults) {
      setRecipes(searchResults);
      setHasSearched(true);
    }
  }, [searchResults]);

  const handleViewToggle = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <IngredientSearch />
      
      {/* Search Results Section */}
      <section id="search-results" className="py-12 bg-background flex-grow">
        <div className="container mx-auto px-4 md:px-6">
          {(hasSearched || isLoading) && (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h2 className="font-merriweather text-2xl font-bold text-foreground">Recipe Results</h2>
                {!isLoading && (
                  <p className="text-gray-600 mt-1">
                    Found <span className="font-semibold">{recipes.length} recipes</span> using your ingredients
                  </p>
                )}
              </div>
              
              {/* View Toggle */}
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <span className="text-sm text-gray-600">View:</span>
                <Button
                  variant="outline"
                  size="icon"
                  className={viewMode === 'grid' ? 'text-primary' : 'text-gray-500'}
                  onClick={() => handleViewToggle('grid')}
                  aria-label="Grid View"
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={viewMode === 'list' ? 'text-primary' : 'text-gray-500'}
                  onClick={() => handleViewToggle('list')}
                  aria-label="List View"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
              } gap-8`}
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow">
                  <Skeleton className="w-full h-48" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex items-center mb-3 space-x-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-14 rounded-full" />
                    </div>
                    <Skeleton className="h-10 w-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">
              <h3 className="font-bold">Error</h3>
              <p>{error instanceof Error ? error.message : 'Failed to load recipes'}</p>
            </div>
          )}

          {!isLoading && !isError && recipes.length > 0 && (
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
              } gap-8`}
            >
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {hasSearched && !isLoading && recipes.length === 0 && !isError && (
            <div className="text-center py-12">
              <h3 className="font-merriweather text-xl mb-4">No recipes found</h3>
              <p className="text-gray-600">
                Try adding different ingredients or removing some to find matching recipes.
              </p>
            </div>
          )}

          {/* Pagination would go here if implemented */}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
