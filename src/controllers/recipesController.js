import createHttpError from 'http-errors';
import { deleteFavoriteRecipe } from '../services/recipesServices.js';

export async function deleteFavoriteRecipeController(req, res, next) {
  const userId = req.user._id;

  const { recipeId } = req.params;
  const user = await deleteFavoriteRecipe(userId, recipeId);
  if (!user) {
    throw createHttpError(404, 'Recipe not found or access denied');
  }
  res.status(200).json({
    status: 200,
    message: 'Recipe removed from favorites',
    // data: user,
  });
}
