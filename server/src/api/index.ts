import { Router } from 'express';
import roomApi from './room';

const router = Router();
router.use('/room', roomApi);

export default router;
