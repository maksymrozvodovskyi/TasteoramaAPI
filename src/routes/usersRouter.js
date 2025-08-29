import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getUserController } from '../controllers/getUser.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getUserController));

export default router;
