import { UsersCollection } from '../db/models/user.js';
import { RecipesCollection } from '../db/models/recipe.js';

// Отримати всі улюблені рецепти користувача
export const getFavoriteRecipes = async (userId) => {
  const user = await UsersCollection.findById(userId).populate(
    'favoritesRecipes',
  );
  if (!user) return [];
  return user.favoritesRecipes;
};

// Отримання власних рецептів
export const getOwnRecipes = async (userId) => {
  return RecipesCollection.find({ owner: userId }).populate(
    'ingredients.id',
    'title',
  );
};

export const getRecipeById = async (recipeId) => {
  return RecipesCollection.findOne({ _id: recipeId });
};

export async function deleteFavoriteRecipe(userId, recipeId) {
  const user = await UsersCollection.findById(userId);
  if (!user) return null;

  const current = user.favoritesRecipes || [];
  const updatedFavorites = current.filter((id) => id.toString() !== recipeId);

  const isChanged = updatedFavorites.length !== current.length;
  if (!isChanged) return null;

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { favoritesRecipes: updatedFavorites },
    { new: true },
  );

  return updatedUser;
}
