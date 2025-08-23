import { getAllIngredients } from '../services/getAllIngredients.js';

export const getIngredientsController = async (req, res) => {
  const ingredients = await getAllIngredients();

  res.json({
    status: 200,
    message: 'Successfully found ingredients!',
    data: ingredients,
  });
};
