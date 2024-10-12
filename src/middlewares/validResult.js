import { validationResult } from 'express-validator';

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Recoge los errores y redirige de nuevo a la página que falló
        const errorMessages = errors.array().map(error => error.msg);

        // Pasar los errores como mensajes flash o directamente a la vista
        return res.render(req.route.path.replace('/', ''), { errors: errorMessages });
    }
    next();
};

export default validarCampos;
