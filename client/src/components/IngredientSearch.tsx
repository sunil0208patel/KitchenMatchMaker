import React, { useState, useEffect, useRef } from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import { useSearchRecipes, useIngredientAutocomplete } from '../hooks/useRecipes';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const commonIngredients = [
  'Tomatoes', 'Onions', 'Pasta', 'Rice', 'Eggs', 'Cheese', 'Bell Peppers',
  'Chicken', 'Garlic', 'Olive Oil', 'Potatoes', 'Carrots', 'Flour', 'Sugar'
];

export const IngredientSearch = () => {
  const {
    selectedIngredients,
    addIngredient,
    removeIngredient,
    clearIngredients,
    searchParams,
    setSearchParams
  } = useRecipeContext();
  
  const [ingredientInput, setIngredientInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const suggestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { data: suggestionData } = useIngredientAutocomplete(ingredientInput);
  const suggestions = suggestionData || [];
  
  const { refetch, isLoading } = useSearchRecipes(searchParams);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleIngredientInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientInput(e.target.value);
    if (e.target.value.length > 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== '') {
      addIngredient(ingredientInput.trim());
      setIngredientInput('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addIngredient(suggestion);
    setIngredientInput('');
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddIngredient();
    }
  };

  const handleQuickAddIngredient = (ingredient: string) => {
    addIngredient(ingredient);
  };

  const handleExactMatchChange = (checked: boolean | string) => {
    setSearchParams(prev => ({ ...prev, ranking: checked ? 2 : 1 }));
  };

  const handleSortChange = (value: string) => {
    setSearchParams(prev => ({ ...prev, ranking: parseInt(value) }));
  };

  const handleSearchRecipes = async () => {
    if (selectedIngredients.length === 0) return;
    
    setIsSearching(true);
    try {
      await refetch();
      // Scroll to results section
      const resultsSection = document.getElementById('search-results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-merriweather text-2xl font-bold text-foreground text-center mb-8">What's in your kitchen?</h2>
          
          <div className="bg-background rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type an ingredient (e.g., chicken, tomatoes, basil)"
                  value={ingredientInput}
                  onChange={handleIngredientInput}
                  onKeyPress={handleKeyPress}
                  onFocus={() => ingredientInput.length > 2 && setShowSuggestions(true)}
                  className="w-full border-r-0 rounded-r-none"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div 
                    ref={suggestionRef} 
                    className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1"
                  >
                    {suggestions.map((suggestion: any, index) => (
                      <div 
                        key={index}
                        className="px-4 py-2 hover:bg-background cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion.name)}
                      >
                        {suggestion.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button 
                type="button" 
                onClick={handleAddIngredient}
                variant="default"
                className="rounded-l-none"
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6" id="selected-ingredients">
              {selectedIngredients.map((ingredient, index) => (
                <div 
                  key={index} 
                  className="bg-secondary/20 text-secondary px-3 py-1 rounded-full flex items-center text-sm transition-all hover:-translate-y-1"
                >
                  <span className="mr-1">{ingredient}</span>
                  <button 
                    className="text-secondary/80 hover:text-secondary"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {selectedIngredients.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs px-2 hover:bg-destructive/10 hover:text-destructive"
                  onClick={clearIngredients}
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm text-gray-500 uppercase font-opensans font-semibold mb-2">Quick Add Common Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {commonIngredients.map((ingredient, index) => (
                  <button 
                    key={index}
                    className="bg-background border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded-full text-sm"
                    onClick={() => handleQuickAddIngredient(ingredient)}
                    disabled={selectedIngredients.includes(ingredient.toLowerCase())}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="exact-match" 
                  className="accent-primary" 
                  onCheckedChange={handleExactMatchChange}
                />
                <Label htmlFor="exact-match" className="text-sm">Show only recipes with exact matches</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="sort-options" className="text-sm">Sort by:</Label>
                <Select defaultValue="1" onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40 text-sm h-8">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Relevance</SelectItem>
                    <SelectItem value="2">Most Ingredients</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white font-opensans font-semibold"
              onClick={handleSearchRecipes}
              disabled={selectedIngredients.length === 0 || isLoading}
            >
              {isLoading ? (
                <>Searching...</>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find Recipes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientSearch;
