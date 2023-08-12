const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth')(passport);

const teamsController = require('../controllers/teams');
// Para traer específicamente la función
const { getUser } = require('../controllers/users');

router.route('/')
   .get(passport.authenticate('jwt',{ session: false }),
      (req,res,next) => {

         let user = getUser(req.user.userID);
         res.status(200).json({
            trainer: user.userName,
            team: teamsController.getTeam(req.user.userID)
         });
      })
   .put((req,res) => {

      teamsController.setTeam(req.body.userID,req.body.team);
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
