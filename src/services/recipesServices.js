import { UsersCollection } from '../db/models/user.js';

export async function deleteFavoriteRecipe(userId, recipeId) {
  const user = await UsersCollection.findById(userId);
  const updatedFavorites = user.favoritesRecipes.filter(
    (id) => id.toString() !== recipeId,
  );

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { favoritesRecipes: updatedFavorites },
    { new: true },
  );

  return updatedUser;
}
