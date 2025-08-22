import createHttpError from 'http-errors';
import {
  getRecipeById,
  getOwnRecipes,
  createOwnRecipe,
} from '../services/recipes.js';

// Отримання власних рецептів
export const getOwnRecipesController = async (req, res) => {
  const recipes = await getOwnRecipes(req.user._id);
  res.json(recipes);
};

// Створення нового рецепту
export const createOwnRecipeController = async (req, res) => {
  const recipe = await createOwnRecipe(req.body, req.user._id);
  res.status(201).json(recipe);
};

export const getRecipeByIdController = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found recipe with id ${id}!`,
    data: recipe,
  });
};
