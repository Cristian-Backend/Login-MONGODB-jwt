import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './database/db.js'; 
import Router from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import path from 'path'; 

// Cargar variables de entorno
dotenv.config();

const app = express();

// Habilitar cookies
app.use(cookieParser());

// Obtener el directorio actual del módulo
const __dirname = path.resolve(); // Obtener el directorio actual

// Establecer la ubicación de las vistas y el motor de plantillas
app.set('views', path.join(__dirname, 'src', 'views')); // Usar path.join para mayor compatibilidad
app.set('view engine', 'ejs'); // Establecer ejs como motor de plantillas

// Configurar carpeta estática para recursos públicos
app.use(express.static(path.join(__dirname, 'src', 'public'))); // Asegúrate de que la ruta sea correcta

// Parsear datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conectar a la base de datos
dbConnection();

// Usar la variable PORT desde el archivo .env o un valor por defecto
const PORT = process.env.PORT || 3000;

// Definir rutas
app.use('/', Router);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
