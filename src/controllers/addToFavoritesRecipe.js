import { RecipesCollection } from '../db/models/recipe.js';
import { getFavoriteRecipes } from '../services/deleteFavoriteRecipe.js';

export const getFavoriteRecipesController = async (req, res) => {
  const recipes = await getFavoriteRecipes(req.user._id);

  res.json({
    status: 200,
    message: 'Successfully fetched favorite recipes!',
    data: recipes,
  });
};

export const addToFavorites = async (req, res) => {
  const { recipeId } = req.params;
  const user = req.user;

  const recipe = await RecipesCollection.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  const alreadyInFavorites = user.favoritesRecipes.some(
    (id) => id.toString() === recipeId,
  );

  if (alreadyInFavorites) {
    return res.status(409).json({ message: 'Already in favorites' });
  }

  user.favoritesRecipes.push(recipe._id);

  await user.save();

  await user.populate('favoritesRecipes');

  res.status(201).json({
    message: 'Recipe added to favorites',
    favoritesRecipes: user.favoritesRecipes,
  });
};
