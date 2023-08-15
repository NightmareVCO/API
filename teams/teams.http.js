const axios = require('axios').default;
const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.controller');

const getTeamFromUser = async (req,res) => {
   let user = getUser(req.user.userID);
   let team = await teamsController.getTeam(req.user.userID);
   res.status(200).json({
      trainer: user.userName,
      team: team
   });
};

const setTeamToUser = (req,res) => {
   teamsController.setTeam(req.user.userID,req.body.team);
   res.status(200).send();
};

const addPokemonToTeam = async (req,res) => {
   let pokemonName = req.body.name;
   let pokeApiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
   let pokemon = {
      name: pokemonName,
      pokemonNumber: pokeApiResponse.data.id
   };

   try
   {
      await teamsController.addPokemon(req.user.userID,pokemon);
      res.status(201).json(pokemon);
   } catch (error)
   {
      res.status(400).json({ message: "You have already 6 pokemons" });
   }
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