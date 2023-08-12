const uuid = require('uuid');
const crypto = require('../crypto.js');
const teams = require('./teams');

const userDatabase = {};
// userID -> password



// Guardar el usuario en la base de datos
const registerUser = (userName,password) => {
   let hashedPassword = crypto.hashPasswordSync(password);
   let userID = uuid.v4();

   userDatabase[userID] = {
      userName: userName,
      password: hashedPassword
   };

   teams.bootstrapTeam(userID);
};

const getUser = (userID) => {
   return userDatabase[userID];
};
const getUserIdFromUserName = (userName) => {

   for (let userID in userDatabase)
      if (userDatabase[userID].userName == userName)
      {
         let userData = userDatabase[userID];
         userData.userID = userID;
         return userData;
      }

};

// Comprobar que las credenciales son correctas
const checkUserCredentials = (userName,password,done) => {
   console.log('checking user credentials');

   let user = getUserIdFromUserName(userName);
   if (user)
   {
      console.log(user);
      crypto.comparePassword(password,user.password,done);
   }
   else
      done('Missing User');

};

module.exports = {
   registerUser,
   checkUserCredentials,
   getUserIdFromUserName,
   getUser
};