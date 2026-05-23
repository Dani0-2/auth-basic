import {Router} from 'express';
import {
    registrarController,
    loginController,
    perfilController
} from '../controllers/usuariosController.js';

const router = Router();

router.post('/registro', registrarController);
router.post('/login', loginController);


router.get('/perfil', perfilController);

export default router;