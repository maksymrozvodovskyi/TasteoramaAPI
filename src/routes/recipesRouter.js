import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { upload } from '../middlewares/multer.js';
import { createRecipeSchema } from '../validation/recipe.validation.js';
import { createNewRecipeController } from '../controllers/createNewRecipeController.js';
import { parseFormDataJson } from '../middlewares/parseFormDataJson.js';
import { deleteFavoriteRecipeController } from '../controllers/recipesController.js';
import { validateId } from '../middlewares/validateID.js';
import { addToFavorites } from '../controllers/favouritesController.js';
const router = Router();
router.delete(
  '/favorites/:recipeId',
  authenticate,
  validateId,
  ctrlWrapper(deleteFavoriteRecipeController),
);

router.post('/', upload.single('thumb'), parseFormDataJson, validateBody(createRecipeSchema), authenticate, ctrlWrapper(createNewRecipeController));
export default router;
