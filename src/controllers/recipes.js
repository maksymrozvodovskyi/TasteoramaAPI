import * as recipesService from '../services/recipes.js';

export const getRecipeByIdController = async (req, res) => {
  const recipe = await recipesService.getRecipeById(req.params.recipeId);
  res.json(recipe);
};

export const getOwnRecipesController = async (req, res) => {
  const recipes = await recipesService.getOwnRecipes(req.user._id);
  res.json(recipes);
};

export const createOwnRecipeController = async (req, res) => {
  const recipe = await recipesService.createOwnRecipe(req.body, req.user._id);
  res.status(201).json(recipe);
};
