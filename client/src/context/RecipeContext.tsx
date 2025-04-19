import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe, SearchParams } from '../types/Recipe';

interface RecipeContextType {
  selectedIngredients: string[];
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  clearIngredients: () => void;
  selectedRecipe: Recipe | null;
  setSelectedRecipe: (recipe: Recipe | null) => void;
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  viewMode: 'grid' | 'list';
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
};

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider = ({ children }: RecipeProviderProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    ingredients: [],
    number: 12,
    ranking: 1,
    ignorePantry: true
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addIngredient = (ingredient: string) => {
    if (ingredient && !selectedIngredients.includes(ingredient.toLowerCase())) {
      const newIngredients = [...selectedIngredients, ingredient.toLowerCase()];
      setSelectedIngredients(newIngredients);
      setSearchParams(prev => ({ ...prev, ingredients: newIngredients }));
    }
  };

  const removeIngredient = (ingredient: string) => {
    const newIngredients = selectedIngredients.filter(i => i !== ingredient);
    setSelectedIngredients(newIngredients);
    setSearchParams(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const clearIngredients = () => {
    setSelectedIngredients([]);
    setSearchParams(prev => ({ ...prev, ingredients: [] }));
  };

  return (
    <RecipeContext.Provider
      value={{
        selectedIngredients,
        addIngredient,
        removeIngredient,
        clearIngredients,
        selectedRecipe,
        setSelectedRecipe,
        searchParams,
        setSearchParams,
        viewMode,
        setViewMode,
        isModalOpen,
        setIsModalOpen
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
