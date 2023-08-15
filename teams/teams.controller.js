let teamsDatabase = {};

const cleanTeamDatabase = () => {
   return new Promise((resolve,reject) => {
      for (user in teamsDatabase)
         teamsDatabase[user] = [];
      resolve();
   });
};

const bootstrapTeam = (userID) => {
   teamsDatabase[userID] = [];
};

const getTeam = (userID) => {
   return new Promise((resolve,reject) => {
      resolve(teamsDatabase[userID]);
   });
};

const addPokemon = (userID,pokemon) => {
   return new Promise((resolve,reject) => {
      if (teamsDatabase[userID].length == 6)
         reject('Team is full');
      else
      {
         teamsDatabase[userID].push(pokemon);
         resolve();
      }
   });
};

const deletePokemonAt = (userID,index) => {
   // console.log('DELETE',userID,index);
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