const teamsDatabase = {};

const bootstrapTeam = (userID) => {
   teamsDatabase[userID] = [];
};

const getTeam = (userID) => {
   return teamsDatabase[userID];
};

const addPokemon = (userID,pokemonName) => {
   teamsDatabase[userID].push({ name: pokemonName });
};

const setTeam = (userID,team) => {
   teamsDatabase[userID] = team;
};

module.exports = {
   setTeam,
   getTeam,
   addPokemon,
   bootstrapTeam,
};