import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema } from '../validation/auth.validation.js';
import { loginUserController } from '../controllers/authLogin.js';

const router = Router();

router.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);

export default router;
