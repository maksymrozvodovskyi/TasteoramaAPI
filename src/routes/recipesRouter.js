import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { searchRecipes } from '../controllers/recipe.js';

const router = Router();

router.get('/', ctrlWrapper(searchRecipes));

export default router;
