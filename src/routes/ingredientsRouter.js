import { Router } from 'express';
import { getIngredientsController } from '../controllers/ingredients.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getIngredientsController));

export default router;
