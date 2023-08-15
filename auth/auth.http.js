const usersController = require('./users.controller');
const jwt = require('jsonwebtoken');
const { to } = require('../tools/to');

const loginUser = async (req,res) => {
   if (!req.body)
      return res.status(400).json({ message: 'missing data' });
   else if (!req.body.userName || !req.body.password)
      return res.status(400).json({ message: 'missing data' });

   //Comprobamos las credenciales del usuario
   let [err,resp] = await to(usersController.checkUserCredentials(req.body.userName,req.body.password));
   // Si son incorrectas, devolvemos un error
   if (err || !resp)
      return res.status(401).json({ message: 'invalid credentials' });

   // Si son correctas, generamos un token
   let user = await usersController.getUserIdFromUserName(req.body.userName);
   const token = jwt.sign({ userID: user.userID },'secretPassword');
   res.status(200).json(
      { token: token }
   );
};

module.exports = {
   loginUser
};