const axios = require('axios').default;
const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.controller');

const getTeamFromUser = (req,res) => {
   let user = getUser(req.user.userID);
   res.status(200).json({
      trainer: user.userName,
      team: teamsController.getTeam(req.user.userID)
   });
};

const setTeamToUser = (req,res) => {
   teamsController.setTeam(req.user.userID,req.body.team);
   res.status(200).send();
};

const addPokemonToTeam = (req,res) => {
   let pokemonName = req.body.name;
   axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
         // handle success
         let pokemon = {
            name: pokemonName,
            pokemonNumber: response.data.id
         };
         teamsController.addPokemon(req.user.userID,pokemon);

         res.status(201).json(pokemon);
      })
      .catch((error) => {
         // handle error
         console.log(error);
         res.status(400).json({ message: error });
      })
      .then(() => {
         // always executed
      });
};

const deletePokemonFromTeam = (req,res) => {
   teamsController.deletePokemonAt(req.user.userID,req.params.pokemonID);
   res.status(200).send();
};

module.exports = {
   getTeamFromUser,
   setTeamToUser,
   addPokemonToTeam,
   deletePokemonFromTeam
};