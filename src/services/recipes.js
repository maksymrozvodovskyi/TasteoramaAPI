import { RecipesCollection } from '../db/models/recipe.js';

export const getRecipeById = async (recipeId) => {
    return RecipesCollection.findById(recipeId);
}