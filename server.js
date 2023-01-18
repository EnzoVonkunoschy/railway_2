const express = require('express');
const app = express();

// Este es un endpoint de ejemplo
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Inicie el servidor en el puerto especificado
app.listen(3000, () => {
    console.log('Server started on port 3000');
});