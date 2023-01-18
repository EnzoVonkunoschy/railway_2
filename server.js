const express = require('express');
const app = express();

// Este es un endpoint de ejemplo
app.get('/', (req, res) => {
    res.send('Hola mundo!');
});

// Inicie el servidor en el puerto especificado
app.listen(3000, () => {
    console.log('Servidor arrancó en puerto 3000');
});