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
const server = app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

// Escuchar comandos desde la consola
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const cmd = input.trim().toLowerCase();
    if (cmd === 'stop' || cmd === 'exit') {
        console.log('Deteniendo el servidor...');
        server.close(() => {
            process.exit(0);
        });
    } else if (cmd === 'reload') {
        console.log('ℹ️ Para recargar la aplicación limpiamente en Node.js, es recomendable usar nodemon.');
        console.log('Si inicias tu app con "npx nodemon index.js", puedes escribir "rs" y presionar Enter para recargar.');
    } else if (cmd !== '') {
        console.log(`Comando no reconocido: "${cmd}". Comandos disponibles: stop, exit, reload`);
    }
});