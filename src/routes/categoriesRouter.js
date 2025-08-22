import { Router } from 'express';
import { getCategoriesController } from '../controllers/categories.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getCategoriesController));

export default router;
