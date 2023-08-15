let teamsDatabase = {};

const cleanTeamDatabase = () => {
   return new Promise((resolve,reject) => {
      for (user in teamsDatabase)
         teamsDatabase[user] = [];
      resolve();
   });
};

const bootstrapTeam = (userID) => {
   return new Promise((resolve,reject) => {
      teamsDatabase[userID] = [];
      resolve();
   });
};

const getTeam = (userID) => {
   return new Promise((resolve,reject) => {
      resolve(teamsDatabase[userID]);
   });

};

const addPokemon = (userID,pokemon) => {
   return new Promise((resolve,reject) => {
      if (teamsDatabase[userID].length == 6)
      {
         reject('Team is full');
      }
      else
      {
         teamsDatabase[userID].push(pokemon);
         resolve();
      }
   });
};

const deletePokemonAt = (userID,index) => {
   return new Promise((resolve,reject) => {
      // Splice para eliminar n elementos a partir de un indice.
      if (teamsDatabase[userID][index])
         teamsDatabase[userID].splice(index,1);
      resolve();
   });

};

const setTeam = (userID,team) => {
   return new Promise((resolve,reject) => {
      teamsDatabase[userID] = team;
      resolve();
   });

};

module.exports = {
   setTeam,
   getTeam,
   addPokemon,
   deletePokemonAt,
   bootstrapTeam,
   cleanTeamDatabase
};