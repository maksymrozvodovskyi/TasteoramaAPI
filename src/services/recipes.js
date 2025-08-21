import createHttpError from 'http-errors';
import { RecipesCollection } from '../db/models/recipes.js';

export const getRecipeById = async (id) => {
  const recipe = await RecipesCollection.findById(id)
    .populate('owner', 'name email')
    .populate('category', 'title')
    .populate('ingredients.id', 'title');

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  return recipe;
};

export const getOwnRecipes = async (userId) => {
  return RecipesCollection.find({ owner: userId })
    .populate('category', 'title')
    .populate('ingredients.id', 'title');
};

export const createOwnRecipe = async (payload, userId) => {
  return RecipesCollection.create({
    ...payload,
    owner: userId,
  });
};
