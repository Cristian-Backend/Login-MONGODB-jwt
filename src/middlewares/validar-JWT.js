import { response, request } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

const validarJWT = async (req = request, res = response, next) => {
    // Leer el token desde la cookie
    const token = req.cookies.token;
    console.log('Token recibido desde la cookie:', token); // Log del token recibido

    if (!token) {
        // Renderizar la vista de login con un mensaje de error si no hay token
        return res.render('login', { 
            error: 'No hay token en la petición (cookie)', 
            errors: [] // Si no hay otros errores
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`Token verificado, UID: ${uid}`); // Log del UID extraído

        const user = await Usuario.findById(uid);
        console.log('Usuario encontrado:', user); // Log del usuario encontrado

        if (!user) {
            return res.render('login', { 
                error: 'Token no válido - usuario no existe en la DB', 
                errors: [] 
            });
        }

        req.user = user; // Asignar el usuario al request
        next(); // Continuar con el siguiente middleware
    } catch (error) {
        console.error('Error en la validación del token:', error); // Log del error
        return res.render('login', { 
            error: 'Token no válido', 
            errors: [] 
        });
    }
};

export default validarJWT;
