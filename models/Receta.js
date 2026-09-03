const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
    nombre: String,
    tipoCocina: String,
    tiempoPreparacion: String,
    ingredientes: [{
        nombre: String, 
        cantidad: Number, 
        unidad: String
    }],
    origen: {
        pais: String, 
        region: String
    }
}, {
    collection: 'recetas_examen'
});

module.exports = mongoose.model('Receta', recetaSchema);