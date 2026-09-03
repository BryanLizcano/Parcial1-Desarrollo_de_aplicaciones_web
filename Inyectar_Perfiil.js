require('dotenv').config();
const mongoose = require('mongoose');

const asistenciaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    idUniversidad: { type: String, required: true },
    hobby: { type: String }
});

const Asistencia = mongoose.model('Asistencia', asistenciaSchema);

const registrarAsistencia = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB...');

        const miPerfil = new Asistencia({
            nombre: "Bryan Gonzalo Lizcano Duran",
            idUniversidad: "000518863",
            hobby: "Modificar y andar en mi moto"
        });

        await miPerfil.save();
        console.log('¡Perfil guardado exitosamente en la colección asistencias! 🚀');
        
        process.exit();
    } catch (error) {
        console.error('Error guardando el perfil:', error);
        process.exit(1);
    }
};

registrarAsistencia();