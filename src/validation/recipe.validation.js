import Joi from 'joi';

export const createRecipeSchema = Joi.object({
  name: Joi.string().max(64).required(),
  decr: Joi.string().max(200).required(),
  cookiesTime: Joi.number().integer().min(1).max(360).required(),
  cals: Joi.number().integer().min(1).max(10000).optional(),
  category: Joi.string().hex().length(24).required(),
  ingredient: Joi.string().hex().length(24).required(),
  ingredientAmount: Joi.number().integer().min(2).max(16).required(),
  instruction: Joi.string().max(1200).required(),
  recipeImg: Joi.any().optional(),
});
