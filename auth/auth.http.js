const usersController = require('./users.controller');
const jwt = require('jsonwebtoken');

const loginUser = (req,res) => {
   if (!req.body)
      return res.status(400).json({ message: 'missing data' });
   else if (!req.body.userName || !req.body.password)
      return res.status(400).json({ message: 'missing data' });

   //Comprobamos las credenciales del usuario
   usersController.checkUserCredentials(req.body.userName,req.body.password,(err,result) => {

      // Si son incorrectas, devolvemos un error
      if (err || !result)
         res.status(401).json({ message: 'invalid credentials' });

      // Si son correctas, generamos un token
      let user = usersController.getUserIdFromUserName(req.body.userName);
      const token = jwt.sign({ userID: user.userID },'secretPassword');
      res.status(200).json(
         { token: token }
      );
   });
};

module.exports = {
   loginUser
};