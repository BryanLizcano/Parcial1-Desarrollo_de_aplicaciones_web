const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // <-- Esto define 'pool'

// Página principal y filtro por categoría
router.get('/', async (req, res) => {
    try {
        const categoriaSeleccionada = req.query.categoria;

        const categoriasRes = await pool.query('SELECT * FROM categorias ORDER BY nombre ASC');

        let queryAutos = 'SELECT a.id, a.marca, a.modelo, a.existencias, c.nombre AS categoria FROM autos a JOIN categorias c ON a.categoria_id = c.id';
        const params = [];

        if (categoriaSeleccionada) {
            queryAutos += ' WHERE c.nombre = $1';
            params.push(categoriaSeleccionada);
        }

        queryAutos += ' ORDER BY a.marca ASC';

        const autosRes = await pool.query(queryAutos, params);

        res.render('autos/autos', {
            nombre: 'Bryan Lizcano',
            autos: autosRes.rows,
            categorias: categoriasRes.rows,
            categoriaActual: categoriaSeleccionada || null
        });
    } catch (error) {
        console.error('Error al obtener autos o categorías:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Detalle de un auto
router.get('/auto/:id', async (req, res) => {
    try {
        const autoId = req.params.id;
        const query = `
            SELECT 
                a.id, 
                a.marca, 
                a.modelo, 
                a.existencias, 
                c.nombre AS categoria,
                p.nombre AS proveedor_nombre,
                p.contacto AS proveedor_contacto
            FROM autos a
            LEFT JOIN categorias c ON a.categoria_id = c.id
            LEFT JOIN proveedores p ON a.proveedor_id = p.id
            WHERE a.id = $1
        `;

        const resultado = await pool.query(query, [autoId]);

        if (resultado.rows.length === 0) {
            return res.status(404).send('Auto no encontrado');
        }

        const fila = resultado.rows[0];

        const auto = {
            id: fila.id,
            marca: fila.marca,
            modelo: fila.modelo,
            categoria: fila.categoria,
            existencias: fila.existencias,
            proveedor: {
                nombre: fila.proveedor_nombre,
                contacto: fila.proveedor_contacto
            }
        };

        res.render('autos/detalle', {
            nombre: 'Bryan Lizcano',
            auto: auto
        });
    } catch (error) {
        console.error('Error obteniendo detalle del auto:', error);
        res.status(500).send('Error en el servidor');
    }
});
// Crear auto - Formulario
router.get('/crear', async (req, res) => {
    try {
        const categoriasRes = await pool.query('SELECT * FROM categorias ORDER BY nombre ASC');
        const proveedoresRes = await pool.query('SELECT * FROM proveedores ORDER BY nombre ASC');
        res.render('autos/crear', {
            nombre: 'Bryan Lizcano',
            categorias: categoriasRes.rows,
            proveedores: proveedoresRes.rows
        });
    } catch (error) {
        console.error('Error al cargar formulario de crear:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Crear auto - Procesar POST
router.post('/crear', async (req, res) => {
    try {
        const { marca, modelo, existencias, categoria_id, proveedor_id } = req.body;
        await pool.query(
            'INSERT INTO autos (marca, modelo, existencias, categoria_id, proveedor_id) VALUES ($1, $2, $3, $4, $5)',
            [marca, modelo, existencias, categoria_id, proveedor_id]
        );
        res.redirect('/autos');
    } catch (error) {
        console.error('Error al crear auto:', error);
        res.status(500).send('Error al crear el auto');
    }
});

// Editar auto - Formulario
router.get('/editar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const autoRes = await pool.query('SELECT * FROM autos WHERE id = $1', [id]);
        
        if (autoRes.rows.length === 0) {
            return res.status(404).send('Auto no encontrado');
        }

        const categoriasRes = await pool.query('SELECT * FROM categorias ORDER BY nombre ASC');
        const proveedoresRes = await pool.query('SELECT * FROM proveedores ORDER BY nombre ASC');
        
        res.render('autos/editar', {
            nombre: 'Bryan Lizcano',
            auto: autoRes.rows[0],
            categorias: categoriasRes.rows,
            proveedores: proveedoresRes.rows
        });
    } catch (error) {
        console.error('Error al cargar formulario de editar:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Editar auto - Procesar POST
router.post('/editar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, modelo, existencias, categoria_id, proveedor_id } = req.body;
        await pool.query(
            'UPDATE autos SET marca = $1, modelo = $2, existencias = $3, categoria_id = $4, proveedor_id = $5 WHERE id = $6',
            [marca, modelo, existencias, categoria_id, proveedor_id, id]
        );
        res.redirect(`/autos/auto/${id}`);
    } catch (error) {
        console.error('Error al actualizar auto:', error);
        res.status(500).send('Error al actualizar el auto');
    }
});

// Eliminar auto
router.post('/eliminar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM autos WHERE id = $1', [id]);
        res.redirect('/autos');
    } catch (error) {
        console.error('Error al eliminar auto:', error);
        res.status(500).send('Error al eliminar el auto');
    }
});

module.exports = router;