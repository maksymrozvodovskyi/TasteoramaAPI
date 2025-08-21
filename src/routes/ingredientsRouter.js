import { Router } from 'express';
import { getIngredientsController } from '../controllers/ingredients/ingredients.js';

const router = Router();

router.get('/', getIngredientsController);

export default router;
