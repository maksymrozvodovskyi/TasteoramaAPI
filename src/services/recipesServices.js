import { UsersCollection } from '../db/models/user.js';

export async function deleteFavoriteRecipe(userId, recipeId) {
  const user = await UsersCollection.findById(userId);
  if (!user) return null;

  const current = user.favouriteRecipes || [];
  const updatedFavorites = current.filter((id) => id.toString() !== recipeId);

  const isChanged = updatedFavorites.length !== current.length;
  if (!isChanged) return null;

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { favouriteRecipes: updatedFavorites },
    { new: true },
  );


  return updatedUser;
}
