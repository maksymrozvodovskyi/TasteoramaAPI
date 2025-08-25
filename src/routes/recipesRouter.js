import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { handleSearchRecipes } from '../controllers/handleSearchRecipes.js';
import {
  addToFavorites,
  getFavoriteRecipesController,
} from '../controllers/addToFavoritesRecipe.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRecipeSchema } from '../validation/recipe.validation.js';
import { createNewRecipeController } from '../controllers/createNewRecipeController.js';
import { parseFormDataJson } from '../middlewares/parseFormDataJson.js';
import {
  getRecipeByIdController,
  getOwnRecipesController,
} from '../controllers/recipes.js';
import { deleteFavoriteRecipeController } from '../controllers/deleteFavoriteRecipe.js';
import { validateId } from '../middlewares/validateID.js';
import { uploadThumb } from '../utils/uploadThumb.js';

const router = Router();

router.get('/own', authenticate, ctrlWrapper(getOwnRecipesController));

router.get('/', ctrlWrapper(handleSearchRecipes));

router.get('/:recipeId', validateId, ctrlWrapper(getRecipeByIdController));

router.get(
  '/favorites',
  authenticate,
  ctrlWrapper(getFavoriteRecipesController),
);

router.delete(
  '/favorites/:recipeId',
  authenticate,
  validateId,
  ctrlWrapper(deleteFavoriteRecipeController),
);

router.post(
  '/favorites/:recipeId',
  validateId,
  authenticate,
  ctrlWrapper(addToFavorites),
);

router.post(
  '/',
  authenticate,
  uploadThumb,
  parseFormDataJson,
  validateBody(createRecipeSchema),
  ctrlWrapper(createNewRecipeController),
);

export default router;
