import { RecipesCollection } from '../db/models/recipe.js';
import { getFavoriteRecipes } from '../services/deleteFavoriteRecipe.js';

export const getFavoriteRecipesController = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;
  const { recipes, total } = await getFavoriteRecipes(
    req.user._id,
    page,
    perPage,
  );

  const totalPages = Math.ceil(total / perPage);

  res.status(200).json({
    status: 200,
    message: 'Successfully fetched favorite recipes!',
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
    return res.status(409).json({
      status: 409,
      message: 'Already in favorites',
    });
  }

  user.favoritesRecipes.push(recipe._id);

  await user.save();

  await user.populate('favoritesRecipes');

  res.status(201).json({
    message: 'Recipe added to favorites',
    favoritesRecipes: user.favoritesRecipes,
  });
};
