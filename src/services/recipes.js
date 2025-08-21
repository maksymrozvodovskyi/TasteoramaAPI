import { RecipesCollection } from '../db/models/recipe.js';

// Отримання власних рецептів
export const getOwnRecipes = async (userId) => {
  return RecipesCollection.find({ owner: userId })
    .populate('category', 'title')
    .populate('ingredients.id', 'title');
};

// Створення з прив’язкою до owner
export const createOwnRecipe = async (payload, userId) => {
  return RecipesCollection.create({
    ...payload,
    owner: userId,
  });
};
