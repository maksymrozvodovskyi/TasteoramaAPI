import { RecipesCollection } from "../db/models/recipe.js";

export const createNewRecipe = async (payload) => {
    const recipe = await RecipesCollection.create(payload);
    return recipe;
};
