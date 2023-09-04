const bcrypt = require('bcrypt');

// Es una funciona async
// 10 iteraciones en el método de cifrado.
const hashPassword = (plainTextPassword, done) => {
   bcrypt.hash(plainTextPassword, 10, done);
};

const hashPasswordSync = (plainTextPassword) => {
   return bcrypt.hashSync(plainTextPassword, 10);
};

const comparePassword = (plainTextPassword, hashedPassword, done) => {
   bcrypt.compare(plainTextPassword, hashedPassword, done);
};

module.exports = {
   hashPassword,
   hashPasswordSync,
   comparePassword
};