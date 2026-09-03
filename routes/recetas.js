const express = require('express');
const router = express.Router();
const Receta = require('../models/Receta');

router.get('/', async (req, res) => {
    try {
        const recetaEncontrada = await Receta.findOne();

        res.render('recetas/recetas', {
            nombre: 'Bryan Lizcano',
            receta: recetaEncontrada
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error obteniendo la receta');
    }
});

module.exports = router;