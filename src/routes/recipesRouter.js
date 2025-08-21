import { Router } from 'express';
import { deleteFavoriteRecipeController } from '../controllers/recipesController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateId } from '../middlewares/validateID.js';

const router = Router();

router.delete(
  '/favorites/:recipeId',
  authenticate,
  validateId,
  ctrlWrapper(deleteFavoriteRecipeController),
);

export default router;
