const uuid = require('uuid');
const crypto = require('../crypto.js');

const userDatabase = {};
// userID -> password



// Guardar el usuario en la base de datos
const registerUser = (userName,password) => {
   let hashedPassword = crypto.hashPasswordSync(password);

   userDatabase[uuid.v4()] = {
      userName: userName,
      password: hashedPassword
   };
};

const getUserIdFromUserName = (userName) => {

   for (let userID in userDatabase)
      if (userDatabase[userID].userName == userName)
         return userDatabase[userID];
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
   checkUserCredentials
};