import { Router } from 'express';
import { deleteFavoriteRecipeController } from '../controllers/recipesController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateId } from '../middlewares/validateID.js';
import { addToFavorites } from '../controllers/favouritesController.js';
import { getRecipeByIdController } from '../controllers/recipes.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/:id', isValidId, ctrlWrapper(getRecipeByIdController));

router.get('/:id', isValidId, ctrlWrapper(getRecipeByIdController));

router.delete(
  '/favorites/:recipeId',
  authenticate,
  validateId,
  ctrlWrapper(deleteFavoriteRecipeController),
);

router.post('/favorites/:recipeId', authenticate, addToFavorites);

export default router;
