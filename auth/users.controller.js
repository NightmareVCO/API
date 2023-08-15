const uuid = require('uuid');
const crypto = require('../tools/crypto.js');
const teams = require('../teams/teams.controller.js');
const mongoose = require('mongoose');
const { to } = require('../tools/to');

// userID -> password
const UserModel = mongoose.model('UserModel',{
   userName: String,
   password: String,
   userID: String
});

const cleanUserDatabase = () => {
   return new Promise(async (resolve,reject) => {
      await UserModel.deleteMany({}).exec();
      resolve();
   });

};

// Guardar el usuario en la base de datos
const registerUser = (userName,password) => {
   return new Promise(async (resolve,reject) => {
      const hashedPassword = crypto.hashPasswordSync(password);
      const userID = uuid.v4();

      const newUser = new UserModel({
         userID: userID,
         userName: userName,
         password: hashedPassword
      });
      await newUser.save();
      await teams.bootstrapTeam(userID);
      resolve();
   });
};

// registerUser('bettatech','1234');
// registerUser('mastermind','1234');

const getUser = (userID) => {
   return new Promise(async (resolve,reject) => {
      const [err,result] = await to(UserModel.findOne({ userID: userID }).exec());
      if (err)
         return reject(err);
      resolve(result);
   });
};

const getUserIdFromUserName = (userName) => {
   return new Promise(async (resolve,reject) => {
      const [err,result] = await to(UserModel.findOne({ userName: userName }).exec());
      if (err)
         return reject(err);
      resolve(result);
   });

};

// Comprobar que las credenciales son correctas
const checkUserCredentials = (userName,password) => {
   return new Promise(async (resolve,reject) => {
      const [err,user] = await to(UserModel.findOne({ userName: userName }));
      if (!err || user)
      {
         // console.log(user);
         crypto.comparePassword(password,user.password,(err,result) => {
            if (err)
               reject(err);
            else
               resolve(result);
         });
      }
      else
         reject(err);
   });
   // console.log('checking user credentials');
};


module.exports = {
   registerUser,
   checkUserCredentials,
   getUserIdFromUserName,
   getUser,
   cleanUserDatabase
};