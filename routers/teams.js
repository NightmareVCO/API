const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth')(passport);

router.route('/')
   .get(passport.authenticate('jwt',{ session: false }),
      (req,res,next) => {
         res.status(200).send('Hello World!');
      })
   .put(() => {
      res.status(200).send('Hello World!');
   });

router.route('/pokemons')
   .post(() => {
      res.status(200).send('Hello World!');
   });
router.route('/pokemons/:pokemonID')
   .delete(() => {
      res.status(200).send('Hello World!');
   });

module.exports = router;
