export interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  usedIngredients: Ingredient[];
  unusedIngredients: Ingredient[];
  likes: number;
  readyInMinutes?: number;
  servings?: number;
  sourceUrl?: string;
  summary?: string;
  instructions?: string;
  analyzedInstructions?: AnalyzedInstruction[];
  nutrition?: RecipeNutrition;
}

export interface RecipeNutrition {
  nutrients: Nutrient[];
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export interface Ingredient {
  id: number;
  name: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  image: string;
}

export interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

export interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
}

export interface Equipment {
  id: number;
  name: string;
  image: string;
}

export interface SearchParams {
  ingredients: string[];
  number?: number;
  ranking?: number;
  ignorePantry?: boolean;
}

export interface RecipeSearchResults {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface RecipeDetailResponse extends Recipe {
  extendedIngredients: Ingredient[];
  summary: string;
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  readyInMinutes: number;
  servings: number;
  sourceName?: string;
  sourceUrl: string;
}
