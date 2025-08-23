import createHttpError from 'http-errors';
import { deleteFavoriteRecipe } from '../services/deleteFavoriteRecipe.js';

export async function deleteFavoriteRecipeController(req, res, next) {
  try {
    console.log(req.user._id);
    console.log(req.params.recipeId);

    const userId = req.user._id;
    const { recipeId } = req.params;

    const updatedUser = await deleteFavoriteRecipe(userId, recipeId);
    if (!updatedUser) {
      return next(
        createHttpError(404, 'Recipe not found in favorites or access denied'),
      );
    }
    res.status(200).json({
      status: 200,
      message: 'Recipe removed from favorites',
      // favouriteRecipes: updatedUser.favouriteRecipes,
    });
  } catch (error) {
    next(error);
  }
}
