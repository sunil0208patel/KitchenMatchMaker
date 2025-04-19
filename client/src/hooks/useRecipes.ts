import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Recipe, RecipeDetailResponse, SearchParams } from '../types/Recipe';
import { useToast } from '@/hooks/use-toast';

export const useSearchRecipes = (searchParams: SearchParams) => {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: ['/api/recipes/search', searchParams],
    enabled: searchParams.ingredients.length > 0,
    onError: (error: Error) => {
      toast({
        title: 'Error searching recipes',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useRecipeDetail = (recipeId: number | null) => {
  const { toast } = useToast();
  
  return useQuery<RecipeDetailResponse>({
    queryKey: ['/api/recipes/detail', recipeId],
    enabled: !!recipeId,
    onError: (error: Error) => {
      toast({
        title: 'Error fetching recipe details',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useIngredientAutocomplete = (query: string) => {
  return useQuery({
    queryKey: ['/api/ingredients/autocomplete', query],
    enabled: query.length > 2,
  });
};
