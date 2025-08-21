import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  getRecipeByIdController,
  getOwnRecipesController,
  createOwnRecipeController,
} from '../controllers/recipes.js';

const router = Router();

// Ihor Yarema публічний ендпоінт для отримання детальної інформації про рецепт за його id
router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

// Ihor Yarema приватні ендпоінти для отримання
// router.use(authenticate);

router.get('/own', ctrlWrapper(getOwnRecipesController));
router.post('/own', ctrlWrapper(createOwnRecipeController));

export default router;
