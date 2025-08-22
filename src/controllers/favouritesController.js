import { RecipesCollection } from '../db/models/recipe.js';

export const addToFavorites = async (req, res) => {
  const { recipeId } = req.params;
  const user = req.user;

  const recipe = await RecipesCollection.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  const alreadyInFavorites = user.favouriteRecipes.some(
    (id) => id.toString() === recipeId,
  );

  if (alreadyInFavorites) {
    return res.status(409).json({ message: 'Already in favorites' });
  }

  user.favouriteRecipes.push(recipe._id);
  await user.save();

  await user.populate('favouriteRcipes');

  res.status(201).json({
    message: 'Recipe added to favorites',
    favorites: user.favouriteRecipes,
  });
};
