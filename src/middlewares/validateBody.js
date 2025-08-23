import createHttpError from 'http-errors';
import fs from 'node:fs/promises';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
      if (req.file) {
          await fs.unlink(req.file.path);
        }
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};
