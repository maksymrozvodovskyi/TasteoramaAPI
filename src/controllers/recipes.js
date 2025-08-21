import * as recipesService from '../services/recipes.js';

// Отримання власних рецептів
export const getOwnRecipesController = async (req, res) => {
  const recipes = await recipesService.getOwnRecipes(req.user._id);
  res.json(recipes);
};

// Створення нового рецепту
export const createOwnRecipeController = async (req, res) => {
  const recipe = await recipesService.createOwnRecipe(req.body, req.user._id);
  res.status(201).json(recipe);
};
