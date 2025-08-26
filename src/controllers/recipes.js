import createHttpError from 'http-errors';
import {
  getRecipeById,
  getOwnRecipes,
} from '../services/deleteFavoriteRecipe.js';

export const getOwnRecipesController = async (req, res) => {
  const { page = 1, perPage = 12 } = req.query;
  const { recipes, total } = await getOwnRecipes(req.user._id, page, perPage);

  const totalPages = Math.ceil(total / perPage);

  res.status(200).json({
    status: 200,
    message: 'Successfully fetched own recipes!',
    data: {
      recipes,
      page: Number(page),
      perPage: Number(perPage),
      totalResults: total,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  });
};

export const getRecipeByIdController = async (req, res, next) => {
  const { recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}!`,
    data: recipe,
  });
};
