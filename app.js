const express = require('express');
const app = express(); // Variable con la capacidad de crear una endpoint
const port = 3000; //todas las conexiones se pueden hacer por el puerto 3000

app.get('/',(req,res) => {
   // req es la request, la petición
   // res es la response, la respuesta
   res.status(200).send('Hello World!');
});

app.post('/team/pokemons',() => {

});

app.get('/team',() => {

});

// Para ponder los parámetros se usa :
app.delete('/team/pokemons/:pokemonID',() => {

});

app.put('/team',() => {

});

// Mientras tengamos esto en la terminal, el puerto 3000 esta escuchando, sino se debe de correr con node.
app.listen(port,() => {
   console.log(`Server running at http://localhost:${port}`);
});