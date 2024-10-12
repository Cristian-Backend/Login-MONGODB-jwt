import express from 'express';
import { login, logout, register } from '../controllers/authControllers.js';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validResult.js';
import validarJWT from '../middlewares/validar-JWT.js';

const router = express.Router();

// Ruta protegida por JWT
router.get('/', validarJWT, (req, res) => {
    console.log('Se está renderizando la vista index');
   res.render('index', { user: req.user }); // Pasa el usuario a la vista
});

router.get('/login', (req, res) => {
    res.render('login', { errors: [] });
});

router.get('/register', (req, res) => {
    res.render('register', { errors: [] }); // Pasar mensajes a la vista
});

// Rutas para los controladores
router.post('/register', [
    check('nombreCompleto', 'El nombre completo es obligatorio').not().isEmpty(),
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
   
],register)

router.post('/login',[
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login)
   

router.get('/logout', logout)

export default router;
