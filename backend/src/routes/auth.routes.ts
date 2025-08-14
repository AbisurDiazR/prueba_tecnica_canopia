import { Router } from 'express';
import login from '../controllers/aut.controller';
import register from '../controllers/aut.controller';

const router = Router();

// Ruta para el registro de usuarios
router.post('/register');

// Ruta para el inicio de sesión
router.post('/login');

export default router;