import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const validateId = (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId))
    throw createHttpError(400, 'Invalid ID format');

  next();
};
