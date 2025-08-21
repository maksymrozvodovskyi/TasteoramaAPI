import { Router } from 'express';
import { logoutController } from '../controllers/authLogout.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post('/logout', ctrlWrapper(logoutController));

export default router;
