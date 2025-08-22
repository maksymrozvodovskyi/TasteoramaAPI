import { getAllIngredients } from '../services/ingredients.js';

export const getIngredientsController = async (req, res) => {
  const ingredients = await getAllIngredients();

  res.json({
    status: 200,
    message: 'Successfully found ingredients!',
    data: ingredients,
  });
};
