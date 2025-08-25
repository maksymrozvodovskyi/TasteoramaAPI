import createHttpError from 'http-errors';
import { upload } from '../middlewares/multer.js';

export const uploadThumb = (req, res, next) => {
  upload.single('thumb')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(createHttpError(400, 'File too large. Max size is 2MB.'));
      }
      return next(createHttpError(400, err.message));
    }
    next();
  });
};
