import { Router } from 'express';
<<<<<<< HEAD
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { searchRecipes } from '../controllers/recipe.js';

const router = Router();

router.get('/', ctrlWrapper(searchRecipes));
=======
import { addToFavorites } from '../controllers/favouritesController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post('/favorites/:recipeId', authenticate, addToFavorites);
>>>>>>> c8f9807ef82223b10edda0c0fcdc1b890f070701

export default router;
