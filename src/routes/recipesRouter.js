import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { handleSearchRecipes } from '../controllers/handleSearchRecipes.js';
import { addToFavorites } from '../controllers/addToFavoritesRecipe.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';
import { createRecipeSchema } from '../validation/recipe.validation.js';
import { createNewRecipeController } from '../controllers/createNewRecipeController.js';
import { parseFormDataJson } from '../middlewares/parseFormDataJson.js';
import { deleteFavoriteRecipeController } from '../controllers/deleteFavoriteRecipe.js';
import { getRecipeByIdController } from '../controllers/getRecipeById.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateId } from '../middlewares/validateID.js';

const router = Router();

router.get('/', ctrlWrapper(handleSearchRecipes));

router.get('/:id', isValidId, ctrlWrapper(getRecipeByIdController));

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
  authenticate,
  upload.single('thumb'),
  parseFormDataJson,
  validateBody(createRecipeSchema),
  ctrlWrapper(createNewRecipeController),
);

export default router;
