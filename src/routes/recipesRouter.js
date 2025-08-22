import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';
import { createRecipeSchema } from '../validation/recipe.validation.js';
import { createNewRecipeController } from '../controllers/createNewRecipeController.js';
import { parseFormDataJson } from '../middlewares/parseFormDataJson.js';
import { deleteFavoriteRecipeController } from '../controllers/recipesController.js';
import { validateId } from '../middlewares/validateID.js';
import {
  addToFavorites,
  getFavoriteRecipesController,
} from '../controllers/favouritesController.js';
import {
  getRecipeByIdController,
  createOwnRecipeController,
  getOwnRecipesController,
} from '../controllers/recipes.js';
import { addToFavorites } from '../controllers/favouritesController.js';
import { getRecipeByIdController } from '../controllers/recipes.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

// всі маршрути тільки для авторизованого користувача
router.use(authenticate);

// GET /api/recipes/own → отримання власних рецептів
router.get('/own', ctrlWrapper(getOwnRecipesController));

// POST /api/recipes/own → створення з прив’язкою до owner
router.post('/own', ctrlWrapper(createOwnRecipeController));

// GET /api/recipes/favorite → отримання улюблених рецептів
router.get('/favorite', ctrlWrapper(getFavoriteRecipesController));

router.get('/:id', isValidId, ctrlWrapper(getRecipeByIdController));

router.delete(
  '/favorites/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteFavoriteRecipeController),
);

router.post(
  '/favorites/:recipeId',
  isValidId,
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
