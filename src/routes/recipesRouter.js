import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getRecipeByIdController } from '../controllers/recipes.js';

const router = Router();

router.get(
    '/:id',
    isValidId,
    ctrlWrapper(getRecipeByIdController),
);

export default router;
