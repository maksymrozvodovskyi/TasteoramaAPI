import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/registerUser.js';
import { logoutController } from '../controllers/logout.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema } from '../validation/auth.validation.js';
import { loginSchema } from '../validation/auth.validation.js';
import { loginUserController } from '../controllers/login.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerUserController),
);

router.post('/logout', authenticate, ctrlWrapper(logoutController));

router.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);

export default router;
