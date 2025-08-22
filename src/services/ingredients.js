import { IngredientsCollection } from '../db/models/ingredient.js';

export const getAllIngredients = async () => {
  return await IngredientsCollection.find();
};
