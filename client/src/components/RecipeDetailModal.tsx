import React, { useEffect } from 'react';
import { X, Star, Clock, Utensils, Flame, Users, Bookmark, Printer, Share2 } from 'lucide-react';
import { useRecipeContext } from '../context/RecipeContext';
import { useRecipeDetail } from '../hooks/useRecipes';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

export const RecipeDetailModal = () => {
  const { selectedRecipe, setSelectedRecipe, isModalOpen, setIsModalOpen } = useRecipeContext();
  
  const recipeId = selectedRecipe?.id || null;
  const { data: recipeDetails, isLoading } = useRecipeDetail(recipeId);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Give some time for the animation to complete before removing data
    setTimeout(() => setSelectedRecipe(null), 300);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden mx-4">
        {/* Modal Header */}
        <div className="relative">
          {isLoading ? (
            <Skeleton className="w-full h-64 rounded-t-lg" />
          ) : (
            <img 
              src={recipeDetails?.image || selectedRecipe?.image || `https://spoonacular.com/recipeImages/${recipeId}-636x393.jpg`} 
              alt={recipeDetails?.title || selectedRecipe?.title} 
              className="w-full h-64 object-cover rounded-t-lg"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = 'https://via.placeholder.com/636x393?text=No+Image+Available';
              }}
            />
          )}
          <button 
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
            onClick={handleCloseModal}
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
            <div className="flex items-center text-white mb-1">
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold mr-3">
                <Star className="inline-block mr-1 h-3 w-3" /> 
                {recipeDetails?.likes ? (recipeDetails.likes/20).toFixed(1) : '4.8'} 
                ({recipeDetails?.likes || '256'} ratings)
              </span>
              <span className="text-xs">
                <Clock className="inline-block mr-1 h-3 w-3" /> 
                {recipeDetails?.readyInMinutes || selectedRecipe?.readyInMinutes || '30'} mins
              </span>
            </div>
            <h2 className="text-white font-merriweather text-2xl font-bold">
              {recipeDetails?.title || selectedRecipe?.title || 'Loading recipe...'}
            </h2>
          </div>
        </div>

        <ScrollArea className="p-6 max-h-[60vh]">
          {/* Recipe Meta */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <div className="flex items-center">
              <Utensils className="text-primary mr-2 h-4 w-4" />
              <span><strong>Category:</strong> {recipeDetails?.dishTypes?.[0] || 'Main Course'}</span>
            </div>
            {recipeDetails?.nutrition?.nutrients && (
              <div className="flex items-center">
                <Flame className="text-primary mr-2 h-4 w-4" />
                <span>
                  <strong>Calories:</strong> {
                    recipeDetails.nutrition.nutrients.find(n => n.name === 'Calories')?.amount.toFixed(0) || '320'
                  } per serving
                </span>
              </div>
            )}
            <div className="flex items-center">
              <Users className="text-primary mr-2 h-4 w-4" />
              <span><strong>Serves:</strong> {recipeDetails?.servings || '4'} people</span>
            </div>
          </div>

          {/* Description */}
          {(isLoading || !recipeDetails) ? (
            <div className="space-y-2 mb-6">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : (
            <div className="mb-6">
              <h3 className="font-merriweather text-lg font-bold mb-2">Description</h3>
              <div 
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
              />
            </div>
          )}

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="font-merriweather text-lg font-bold mb-2">Ingredients</h3>
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {recipeDetails?.extendedIngredients?.map((ingredient, index) => (
                  <li 
                    key={index} 
                    className={`px-3 py-1 pl-0 rounded ${
                      selectedRecipe?.usedIngredients.some(i => i.name.toLowerCase() === ingredient.name.toLowerCase())
                        ? 'bg-secondary/20'
                        : ''
                    }`}
                  >
                    {ingredient.original}
                  </li>
                ))}
                {!recipeDetails?.extendedIngredients && selectedRecipe?.usedIngredients.map((ingredient, index) => (
                  <li key={index} className="bg-secondary/20 px-3 py-1 pl-0 rounded">
                    {ingredient.original}
                  </li>
                ))}
                {!recipeDetails?.extendedIngredients && selectedRecipe?.missedIngredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h3 className="font-merriweather text-lg font-bold mb-2">Instructions</h3>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recipeDetails?.analyzedInstructions?.length ? (
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                {recipeDetails.analyzedInstructions[0].steps.map((step, index) => (
                  <li key={index}>{step.step}</li>
                ))}
              </ol>
            ) : recipeDetails?.instructions ? (
              <div 
                className="text-gray-700 space-y-2"
                dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}
              />
            ) : (
              <p className="text-gray-500 italic">No detailed instructions available for this recipe.</p>
            )}
          </div>

          {/* Nutrition if available */}
          {recipeDetails?.nutrition?.nutrients && (
            <div className="mb-6">
              <h3 className="font-merriweather text-lg font-bold mb-2">Nutrition Information</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {['Calories', 'Protein', 'Fat', 'Carbohydrates'].map((nutrient, index) => {
                  const nutrientData = recipeDetails.nutrition.nutrients.find(n => n.name === nutrient);
                  return (
                    <div key={index} className="bg-background p-3 rounded">
                      <div className="text-primary font-bold">
                        {nutrientData ? `${nutrientData.amount.toFixed(0)}${nutrientData.unit}` : '--'}
                      </div>
                      <div className="text-xs text-gray-600">{nutrient}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Action Buttons */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-3">
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              <Bookmark className="mr-2 h-4 w-4" /> Save Recipe
            </Button>
            <Button className="flex-1 bg-secondary hover:bg-secondary/90">
              <Printer className="mr-2 h-4 w-4" /> Print Recipe
            </Button>
            <Button variant="outline" className="p-3 aspect-square">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
