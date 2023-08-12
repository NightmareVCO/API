const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Controllers.
const usersController = require('../controllers/users');
usersController.registerUser('bettatech','1234');
usersController.registerUser('mastermind','1234');

router.route('/')
   .get((req,res) => {
      res.send('GET Auth router');
   })
   .post((req,res) => {
      req.send('POST Auth router');
   });

router.route('/login')
   .post((req,res) => {
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

module.exports = router;