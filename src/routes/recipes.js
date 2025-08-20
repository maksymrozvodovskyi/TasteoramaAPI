import express from 'express';
import { isValidId } from '../middlewares/isValidId';
import { ctrlWrapper } from '../utils/ctrlWrapper.js'
import { getRecipeByIdController } from '../controllers/recipes';

const router = express.Router();

router.get(
    '/:id',
    isValidId,
    ctrlWrapper(getRecipeByIdController),
);

export default router;