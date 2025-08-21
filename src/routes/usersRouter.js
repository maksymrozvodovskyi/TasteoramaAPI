import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getUserController } from '../controllers/users.js';

const router = Router();

router.use(authenticate);

router.get('/', getUserController);

export default router;
