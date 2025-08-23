import createHttpError from 'http-errors';
import { categories } from '../constants/categories.js';

export const parseFormDataJson = (req, res, next) => {
  if (!req.body) {
      throw createHttpError(400, 'Bad Request');
    }
  try {
    if (req.body.ingredients && typeof req.body.ingredients === "string") {
      req.body.ingredients = JSON.parse(req.body.ingredients);
    }
    if (!categories.includes(req.body.category)) {
      throw createHttpError(400, 'Invalid category');
    }
    } catch (err) {
      throw createHttpError(400, err.message);
    }

  next();
};
