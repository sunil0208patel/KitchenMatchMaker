import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

const API_KEY = process.env.SPOONACULAR_API_KEY || "1c3de7dbf1a04629aa1e8c8353177bf5";
const BASE_URL = "https://api.spoonacular.com";

export async function registerRoutes(app: Express): Promise<Server> {
  // Search recipes by ingredients
  app.get("/api/recipes/search", async (req, res) => {
    try {
      const { ingredients, number = 12, ranking = 1, ignorePantry = true } = req.query;
      
      if (!ingredients) {
        return res.status(400).json({ message: "Ingredients parameter is required" });
      }

      const ingredientsParam = Array.isArray(ingredients) 
        ? ingredients.join(',') 
        : ingredients;

      const response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, {
        params: {
          ingredients: ingredientsParam,
          number,
          ranking,
          ignorePantry,
          apiKey: API_KEY
        }
      });

      res.json(response.data);
    } catch (error) {
      console.error('Error searching recipes:', error);
      res.status(500).json({ 
        message: "Failed to search recipes",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Get recipe details
  app.get("/api/recipes/detail/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ message: "Recipe ID is required" });
      }

      const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
        params: {
          includeNutrition: true,
          apiKey: API_KEY
        }
      });

      res.json(response.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      res.status(500).json({ 
        message: "Failed to fetch recipe details",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // Recipe autocomplete endpoint
  app.get("/api/ingredients/autocomplete", async (req, res) => {
    try {
      const { query, number = 5 } = req.query;
      
      if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
      }

      const response = await axios.get(`${BASE_URL}/food/ingredients/autocomplete`, {
        params: {
          query,
          number,
          apiKey: API_KEY
        }
      });

      res.json(response.data);
    } catch (error) {
      console.error('Error with autocomplete:', error);
      res.status(500).json({ 
        message: "Failed to get autocomplete suggestions",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
