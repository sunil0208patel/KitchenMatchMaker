import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define users table for potential future features (saving favorite recipes, etc.)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Define saved recipes table
export const savedRecipes = pgTable("saved_recipes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  recipeId: integer("recipe_id").notNull(),
  recipeName: text("recipe_name").notNull(),
  recipeImage: text("recipe_image"),
  recipeDetails: jsonb("recipe_details"),
  savedAt: text("saved_at").notNull(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSavedRecipeSchema = createInsertSchema(savedRecipes).pick({
  userId: true,
  recipeId: true,
  recipeName: true,
  recipeImage: true,
  recipeDetails: true,
  savedAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSavedRecipe = z.infer<typeof insertSavedRecipeSchema>;
export type SavedRecipe = typeof savedRecipes.$inferSelect;
