import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { handleSearchRecipes } from '../controllers/handleSearchRecipes.js';
import {
  addToFavorites,
  getFavoriteRecipesController,
} from '../controllers/addToFavoritesRecipe.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';
import { createRecipeSchema } from '../validation/recipe.validation.js';
import { createNewRecipeController } from '../controllers/createNewRecipeController.js';
import { parseFormDataJson } from '../middlewares/parseFormDataJson.js';
import {
  getRecipeByIdController,
  getOwnRecipesController,
} from '../controllers/recipes.js';
import { deleteFavoriteRecipeController } from '../controllers/deleteFavoriteRecipe.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateId } from '../middlewares/validateID.js';

const router = Router();

router.get('/own', authenticate, ctrlWrapper(getOwnRecipesController));

router.get('/', ctrlWrapper(handleSearchRecipes));

router.get('/:id', isValidId, ctrlWrapper(getRecipeByIdController));

router.get(
  '/favorites',
  authenticate,
  ctrlWrapper(getFavoriteRecipesController),
);

router.delete(
  '/favorites/:recipeId',
  authenticate,
  isValidId,
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
  upload.single('thumb'),
  parseFormDataJson,
  validateBody(createRecipeSchema),
  authenticate,
  ctrlWrapper(createNewRecipeController),
);

export default router;
