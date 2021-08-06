import { Router } from 'express';
import roomApi from './room';

const router = Router();
router.use('/rooms', roomApi);

export default router;
