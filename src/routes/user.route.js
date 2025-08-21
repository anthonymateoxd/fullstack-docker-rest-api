import { Router } from 'express';
import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  postUsuario,
  putUsuario,
} from '../controller/user.controller.js';

const router = Router();

router.get('/user', getUsuarios);
router.get('/user/:id', getUsuario);
router.post('/user', postUsuario);
router.put('/user/:id', putUsuario);
router.delete('/user/:id', deleteUsuario);

export default router;
