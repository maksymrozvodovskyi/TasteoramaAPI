import createHttpError from 'http-errors';

export const parseFormDataJson = (req, res, next) => {
  if (req.body.ingredients && typeof req.body.ingredients === 'string') {
    try {
      req.body.ingredients = JSON.parse(req.body.ingredients);
    } catch {
      throw createHttpError(400, 'Invalid JSON in ingredients');
    }
  }
  next();
};
