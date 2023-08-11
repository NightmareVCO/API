const express = require('express');
const passport = require('passport');
require('./auth')(passport);

const app = express();
const port = 3000;

// Llamada al endpoint '/'
app.get('/',(req,res) => {
   res.status(200).send('Hello World!');
});

app.listen(port,(req,res) => {
   console.log(`server app listening on port ${port}`);
});

app.post('/login',(req,res) => {
   //Comprobamos las credenciales del usuario
   res.status(200).json(
      { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zX5MPQtbjoNAS7rpsx_hI7gqGIlXOQq758dIqyBVxxY' }
   );
});


app.post('/team/pokemons',(req,res) => {
   res.status(200).send('Hello World!');
});

app.get('/team',
   passport.authenticate('jwt',{ session: false }),
   (req,res) => {
      res.status(200).send('Hello World!');
   });

// Para ponder los parámetros se usa :
app.delete('/team/pokemons/:pokemonID',(req,res) => {
   res.status(200).send('Hello World!');
});

app.put('/team',(req,res) => {
   res.status(200).send('Hello World!');
});

module.exports = app;