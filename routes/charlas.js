const express = require('express');
const router = express.Router();

const Charla = require('../models/Charla');

// Obtener todas las charlas (Solo Mostrar)
router.get('/', async (req, res) => {
    try {
        const charlas = await Charla.find();

        res.render('charlas/charlas', {
            nombre: 'Bryan Lizcano',
            charlas: charlas
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error obteniendo las charlas');
    }
});
// Formulario para crear charla
router.get('/crear', (req, res) => {
    res.render('charlas/crear', { nombre: 'Bryan Lizcano' });
});

// Procesar creación
router.post('/crear', async (req, res) => {
    try {
        const { titulo, descripcion, fecha, hora, expositor_nombre, expositor_especialidad, expositor_correo } = req.body;
        const nuevaCharla = new Charla({
            titulo,
            descripcion,
            fecha,
            hora,
            expositor: {
                nombre: expositor_nombre,
                especialidad: expositor_especialidad,
                correo: expositor_correo
            }
        });
        await nuevaCharla.save();
        res.redirect('/charlas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creando la charla');
    }
});

// Formulario de edición
router.get('/editar/:id', async (req, res) => {
    try {
        const charla = await Charla.findById(req.params.id);
        if (!charla) {
            return res.status(404).send('Charla no encontrada');
        }
        res.render('charlas/editar', {
            nombre: 'Bryan Lizcano',
            charla
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error obteniendo la charla');
    }
});

// Procesar edición
router.post('/editar/:id', async (req, res) => {
    try {
        const { titulo, descripcion, fecha, hora, expositor_nombre, expositor_especialidad, expositor_correo } = req.body;
        await Charla.findByIdAndUpdate(req.params.id, {
            titulo,
            descripcion,
            fecha,
            hora,
            expositor: {
                nombre: expositor_nombre,
                especialidad: expositor_especialidad,
                correo: expositor_correo
            }
        });
        res.redirect('/charlas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error actualizando la charla');
    }
});

// Eliminar charla
router.post('/eliminar/:id', async (req, res) => {
    try {
        await Charla.findByIdAndDelete(req.params.id);
        res.redirect('/charlas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error eliminando la charla');
    }
});

module.exports = router;