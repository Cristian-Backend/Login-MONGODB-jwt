import bcryptjs from 'bcryptjs';
import Usuario from '../models/usuario.js';
import generarJWT from '../helpers/generar-JWT.js';

const register = async (req, res) => {
  try {
      const { nombreCompleto, user, password } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await Usuario.findOne({ user });
      if (existingUser) {
          return res.render('register', { 
              errors: ['El usuario ya existe'], 
              nombreCompleto, 
              user 
          });
      }

      // Encriptar la contraseña
      const passHash = await bcryptjs.hash(password, 8);

      // Crear un nuevo usuario
      const newUser = new Usuario({
          nombreCompleto,
          user,
          password: passHash
      });

      await newUser.save();

      // Redirigir si el registro es exitoso
      return res.redirect('/login');
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Error al procesar la solicitud' });
  }
};


const login = async (req, res ) => {
  const { user, password } = req.body;

  try {
      // Buscar al usuario en la base de datos
      const usuario = await Usuario.findOne({ user });

      // Si el usuario no existe, renderiza el login con un mensaje de error
      if (!usuario) {
          return res.render('login', { errors: ['El usuario no existe'], user });
      }

      // Verificar la contraseña
      const passwordValido = await bcryptjs.compare(password, usuario.password);
      if (!passwordValido) {
          return res.render('login', { errors: ['Contraseña incorrecta'], user });
      }

      // Generar el token JWT
      const token = await generarJWT(usuario._id);

      // Establecer el token en una cookie
      res.cookie('token', token, {
          httpOnly: true, // La cookie no puede ser accedida por JavaScript en el navegador
          secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
          maxAge: 3600000 // 1 hora
      });

      // Redirigir a la vista index.ejs después del login exitoso
      return res.redirect('/');
  } catch (error) {
      console.log(error.message);
      return res.render('login', { errors: ['Error al procesar la solicitud'] });
  }
};


const logout = (req, res) => {
  // Asegúrate de que el nombre coincida con el que usaste al crear la cookie
  res.clearCookie('token', { path: '/', httpOnly: true, sameSite: 'strict' });
  return res.redirect('/login');
};

export {
    register,
    login,
    logout
};


