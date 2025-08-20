import { Router } from 'express';
import { addToFavorites } from '../controllers/favouritesController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post('/favorites/:recipeId', authenticate, addToFavorites);

export default router;
