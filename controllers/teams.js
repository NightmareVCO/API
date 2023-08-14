let teamsDatabase = {};

const cleanTeamDatabase = () => {
   for (user in teamsDatabase)
      teamsDatabase[user] = [];
};
const bootstrapTeam = (userID) => {
   teamsDatabase[userID] = [];
};

const getTeam = (userID) => {
   return teamsDatabase[userID];
};

const addPokemon = (userID,pokemon) => {
   teamsDatabase[userID].push(pokemon);
};

const deletePokemonAt = (userID,index) => {
   console.log('DELETE',userID,index);
   if (teamsDatabase[userID][index])
      // Splice para eliminar n elementos a partir de un indice.
      teamsDatabase[userID].splice(index,1);
};

const setTeam = (userID,team) => {
   teamsDatabase[userID] = team;
};

module.exports = {
   setTeam,
   getTeam,
   addPokemon,
   deletePokemonAt,
   bootstrapTeam,
   cleanTeamDatabase
};