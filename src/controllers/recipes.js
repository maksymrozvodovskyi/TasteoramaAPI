import createHttpError from 'http-errors';
import {
  getRecipeById,
  getOwnRecipes,
} from '../services/deleteFavoriteRecipe.js';

// Отримання власних рецептів
export const getOwnRecipesController = async (req, res) => {
  const recipes = await getOwnRecipes(req.user._id);

  res.json({
    status: 200,
    message: 'Successfully fetched own recipes!',
    data: recipes,
  });
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
