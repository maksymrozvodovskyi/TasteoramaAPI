import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getOwnRecipesController,
  createOwnRecipeController,
} from '../controllers/recipes.js';

const router = Router();

// всі маршрути тільки для авторизованого користувача
router.use(authenticate);

// GET /api/recipes/own → отримання власних рецептів
router.get('/own', ctrlWrapper(getOwnRecipesController));

// POST /api/recipes/own → створення з прив’язкою до owner
router.post('/own', ctrlWrapper(createOwnRecipeController));

export default router;
