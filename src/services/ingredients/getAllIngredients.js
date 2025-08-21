import { IngredientsCollection } from '../../db/models/ingredient.js';

export const getAllIngredients = async (req, res) => {
  return await IngredientsCollection.find();
};
