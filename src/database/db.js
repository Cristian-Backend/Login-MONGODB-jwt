import mongoose from "mongoose";



// Connect to MongoDB
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            family: 4
        });

        console.log('BASE DE DATOS ONLINE');
        
    } catch (error) {
        console.error('Error al iniciar la base de datos:', error.message);
        throw new Error('Error al iniciar la base de datos');
    }
};

export default dbConnection;
