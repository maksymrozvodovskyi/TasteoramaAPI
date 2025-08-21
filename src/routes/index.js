import { Router } from 'express';
import authRouter from './authRouter.js';
import usersRouter from './usersRouter.js';
import categoriesRouter from './categoriesRouter.js';
import ingredientsRouter from './ingredientsRouter.js';
import recipesRouter from './recipesRouter.js';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/ingredients', ingredientsRouter);
router.use('/api/recipes', recipesRouter);

export default router;
