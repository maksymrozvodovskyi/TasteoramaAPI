import { Router } from 'express';
import categoriesRouter from './categoriesRouter.js';

const router = Router();

router.use('/api/categories', categoriesRouter);

export default router;
