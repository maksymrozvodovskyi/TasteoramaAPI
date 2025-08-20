import { Router } from 'express';
import { getCategoriesController } from '../controllers/categories.js';

const router = Router();

router.get('/', getCategoriesController);

export default router;
