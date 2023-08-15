const axios = require('axios').default;
const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.controller');
const { to } = require('../tools/to');

const getTeamFromUser = async (req,res) => {
   const user = await getUser(req.user.userID);

   const [teamErr,team] = await to(teamsController.getTeam(req.user.userID));
   if (teamErr)
      res.status(400).json({ message: teamErr });

   res.status(200).json({
      trainer: user.userName,
      team: team
   });
};

const setTeamToUser = async (req,res) => {
   const [err,resp] = await to(teamsController.setTeam(req.user.userID,req.body.team));

   if (err)
      res.status(400).json({ message: err });
   res.status(200).send();
};

const addPokemonToTeam = async (req,res) => {
   const pokemonName = req.body.name;
   const [pokeApiError,pokeApiResponse] = await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`));

   if (pokeApiError)
      res.status(400).json({ message: pokeApiError });

   const pokemon = {
      name: pokemonName,
      pokemonNumber: pokeApiResponse.data.id
   };

   const [erroAdd,response] = await to(teamsController.addPokemon(req.user.userID,pokemon));
   if (erroAdd)
      res.status(400).json({ message: "You have already 6 pokemons" });

   res.status(201).json(pokemon);
};

const deletePokemonFromTeam = async (req,res) => {
   const [err,response] = await to(teamsController.deletePokemonAt(req.user.userID,req.params.pokemonID));
   if (err)
      res.status(400).json({ message: err });
   res.status(200).send();
};

module.exports = {
   getTeamFromUser,
   setTeamToUser,
   addPokemonToTeam,
   deletePokemonFromTeam
};