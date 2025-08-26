import { UsersCollection } from '../db/models/user.js';
import { RecipesCollection } from '../db/models/recipe.js';

export const getFavoriteRecipes = async (userId, page = 1, perPage = 12) => {
  const skip = (page - 1) * perPage;

  const user = await UsersCollection.findById(userId).populate({
    path: 'favoritesRecipes',
    options: { skip, limit: perPage },
    populate: { path: 'ingredients.id', select: 'title' },
  });

  if (!user) return { recipes: [], total: 0, skip };

  const totalUser = await UsersCollection.findById(userId).select(
    'favoritesRecipes',
  );
  const total = totalUser?.favoritesRecipes.length || 0;

  return { recipes: user.favoritesRecipes, total, skip };
};

export const getOwnRecipes = async (userId, page = 1, perPage = 12) => {
  const skip = (page - 1) * perPage;

  const [recipes, total] = await Promise.all([
    RecipesCollection.find({ owner: userId })
      .populate('ingredients.id', 'title')
      .skip(skip)
      .limit(perPage),
    RecipesCollection.countDocuments({ owner: userId }),
  ]);

  return { recipes, total, skip };
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
