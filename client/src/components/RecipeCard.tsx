import React from 'react';
import { Clock, Star, Utensils, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRecipeContext } from '../context/RecipeContext';
import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { setSelectedRecipe, setIsModalOpen } = useRecipeContext();

  const handleViewRecipe = () => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  return (
    <Card className="recipe-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img 
          src={recipe.image || `https://spoonacular.com/recipeImages/${recipe.id}-480x360.jpg`} 
          alt={recipe.title} 
          className="w-full h-48 object-cover"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = 'https://via.placeholder.com/480x360?text=No+Image+Available';
          }}
        />
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold">
          <Star className="inline-block mr-1 h-3 w-3" /> {recipe.likes > 0 ? (recipe.likes / 20).toFixed(1) : '4.5'}
        </div>
        {recipe.readyInMinutes && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="text-white text-xs font-semibold">
              <Clock className="inline-block mr-1 h-3 w-3" /> {recipe.readyInMinutes} mins
            </div>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-merriweather font-bold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
        
        <div className="flex items-center mb-3">
          <div className="bg-success/20 text-success text-xs px-2 py-1 rounded mr-2">
            <Check className="inline-block mr-1 h-3 w-3" /> {recipe.usedIngredientCount} matches
          </div>
          <div className="text-gray-600 text-xs">
            <Utensils className="inline-block mr-1 h-3 w-3" /> 
            {recipe.missedIngredients[0]?.aisle || 'Main Course'}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Matching ingredients:</div>
          <div className="flex flex-wrap gap-1">
            {recipe.usedIngredients.map((ingredient, index) => (
              <span key={index} className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs">
                {ingredient.name}
              </span>
            ))}
          </div>
        </div>
        
        <Button 
          className="w-full bg-primary text-white hover:bg-primary/90 text-sm font-semibold"
          onClick={handleViewRecipe}
        >
          View Recipe
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
