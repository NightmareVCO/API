const mongoose = require('mongoose');
const { to } = require('../tools/to');
// userID -> password
const teamsModel = mongoose.model('TeamsModel', {
   userID: String,
   team: []
});
const cleanTeamDatabase = () => {
   return new Promise(async (resolve, reject) => {
      await teamsModel.deleteMany({}).exec();
      resolve();
   });
};

const bootstrapTeam = (userID) => {
   return new Promise(async (resolve, reject) => {
      const newTeam = new teamsModel({
         userID: userID,
         team: []
      });
      await newTeam.save();
      resolve();
   });
};

const getTeam = (userID) => {
   return new Promise(async (resolve, reject) => {
      const [err, dbteam] = await to(teamsModel.findOne({ userID: userID }).exec());
      if (err || !dbteam)
         return reject(err);

      resolve(dbteam.team || []);
   });
};

const addPokemon = (userID, pokemon) => {
   return new Promise(async (resolve, reject) => {
      const [err, dbteam] = await to(teamsModel.findOne({ userID: userID }).exec());
      if (err)
         reject(err);

      if (dbteam.team.length == 6) {
         reject('Team is full');
      }
      else {
         dbteam.team.push(pokemon);
         await dbteam.save();
         resolve();
      }
   });
};

const deletePokemonAt = (userID, index) => {
   return new Promise(async (resolve, reject) => {
      // Splice para eliminar n elementos a partir de un indice.
      const [err, dbteam] = await to(teamsModel.findOne({ userID: userID }).exec());
      if (err || !dbteam)
         return reject(err);

      if (dbteam.team[index])
         dbteam.team.splice(index, 1);

      await dbteam.save();
      resolve();
   });
};

const setTeam = (userID, team) => {
   return new Promise(async (resolve, reject) => {

      const [err, dbteam] = await to(teamsModel.updateOne(
         { userID: userID },
         { $set: { team: team } },
         { upsert: true }
      ).exec());

      if (err || !dbteam)
         return reject(err);

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