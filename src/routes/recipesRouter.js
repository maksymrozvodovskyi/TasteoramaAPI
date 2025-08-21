import { Router } from 'express';
import { deleteFavoriteRecipeController } from '../controllers/recipesController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateId } from '../middlewares/validateID.js';

const recipesRouter = Router();

recipesRouter.delete(
  '/favorites/:recipeId',
  authenticate,
  validateId,
  ctrlWrapper(deleteFavoriteRecipeController),
);

export default recipesRouter;
