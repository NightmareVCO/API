const uuid = require('uuid');
const crypto = require('../tools/crypto.js');
const teams = require('../teams/teams.controller.js');

let userDatabase = {};
// userID -> password


const cleanUserDatabase = () => {
   return new Promise((resolve,reject) => {
      userDatabase = {};
      resolve();
   });

};

// Guardar el usuario en la base de datos
const registerUser = (userName,password) => {
   return new Promise(async (resolve,reject) => {
      let hashedPassword = crypto.hashPasswordSync(password);
      let userID = uuid.v4();

      userDatabase[userID] = {
         userName: userName,
         password: hashedPassword
      };

      await teams.bootstrapTeam(userID);
      resolve();
   });
};

const getUser = (userID) => {
   return new Promise((resolve,reject) => {
      resolve(userDatabase[userID]);
   });
};

const getUserIdFromUserName = (userName) => {
   return new Promise(async (resolve,reject) => {
      for (let userID in userDatabase)
         if (userDatabase[userID].userName == userName)
         {
            let userData = userDatabase[userID];
            userData.userID = userID;
            // ya que tenemos dos para que solo se ejecute uno
            return resolve(userData);
         }
      reject('No user found');
   });
};

// Comprobar que las credenciales son correctas
const checkUserCredentials = (userName,password) => {
   return new Promise(async (resolve,reject) => {
      let user = await getUserIdFromUserName(userName);
      if (user)
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
         reject('Missing User');
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