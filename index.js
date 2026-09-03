require('dotenv').config();

const express = require('express');

const recetasRoutes = require('./routes/recetas');

const connectMongo = require('./config/mongo');

const app = express();

connectMongo();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta Menú Principal
app.get('/', (req, res) => {
    res.render('home', { nombre: 'Bryan Lizcano' });
});

// Ruta recetas
app.use('/recetas', recetasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));