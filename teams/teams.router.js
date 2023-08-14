const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');

const teamsController = require('./teams.controller');
// Para traer específicamente la función
const { getUser } = require('../auth/users.controller');

router.route('/')
   .get(passport.authenticate('jwt',{ session: false }),
      (req,res) => {
         let user = getUser(req.user.userID);
         res.status(200).json({
            trainer: user.userName,
            team: teamsController.getTeam(req.user.userID)
         });
      })
   .put(passport.authenticate('jwt',{ session: false }),
      (req,res) => {
         teamsController.setTeam(req.user.userID,req.body.team);
         res.status(200).send();
      });

router.route('/pokemons')
   .post(passport.authenticate('jwt',{ session: false }),
      (req,res) => {
         let pokemonName = req.body.name;
         // console.log('calling pokeapi for: ' + pokemonName);
         axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase())
            .then((response) => {
               let pokemon = {
                  name: pokemonName,
                  pokemonNumber: response.data.id
               };
               teamsController.addPokemon(req.user.userID,pokemon);

               res.status(201).json(pokemon);
            })
            .catch((error) => {
               // console.log(error);
               res.status(400).json({ message: error });
            })
            .then(() => {

            });

      });


router.route('/pokemons/:pokemonID')
   .delete(passport.authenticate('jwt',{ session: false }),
      (req,res) => {
         teamsController.deletePokemonAt(req.user.userID,req.params.pokemonID);
         res.status(200).send();
      });

module.exports = router;
