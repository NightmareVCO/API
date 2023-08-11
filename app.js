const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const usersController = require('./controllers/users');
usersController.registerUser('bettatech','1234');
usersController.registerUser('mastermind','1234');


require('./auth')(passport);

const app = express();
app.use(bodyParser.json());

const port = 3000;

// Llamada al endpoint '/'
app.get('/',(req,res) => {
   res.status(200).send('Hello World!');
});

app.listen(port,(req,res) => {
   console.log(`server app listening on port ${port}`);
});

app.post('/login',(req,res) => {
   if (!req.body)
      return res.status(400).json({ message: 'missing data' });
   else if (!req.body.userName || !req.body.password)
      return res.status(400).json({ message: 'missing data' });

   //Comprobamos las credenciales del usuario
   usersController.checkUserCredentials(req.body.userName,req.body.password,(err,result) => {

      // Si son incorrectas, devolvemos un error
      if (err || !result)
         res.status(401).json({ message: 'invalid credentials' });

      // Si son correctas, generamos un token
      const token = jwt.sign({ userID: result },'secretPassword');
      res.status(200).json(
         { token: token }
      );

   });
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