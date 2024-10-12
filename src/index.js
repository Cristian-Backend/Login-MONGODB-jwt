import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './database/db.js'; 
import Router  from './routes/user.routes.js'
import cookieParser from 'cookie-parser';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Habilitar cookies
app.use(cookieParser());

// motor de plantillas
app.set('views', './src/views'); // Indicar la ubicación de las vistas
app.set('view engine', 'ejs'); // Establecer ejs como motor de plantillas

// carpeta public
app.use(express.static('src/public'));

// parsear los datos del formulario
app.use(express.urlencoded({ extended: true}));
app.use(express.json())

// Conectar a la base de datos
dbConnection();

// Usar la variable PORT desde el archivo .env o un valor por defecto
const PORT = process.env.PORT || 3000;

// Definir rutas
app.use('/', Router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
