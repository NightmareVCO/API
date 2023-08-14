const authMiddleware = require('./tools/auth.middleware');
const bodyParser = require('body-parser');
// Aquí podemos agregar cualquiera otra cosa que queramos que express use y/o haga.
// 
const setupMiddleware = (app) => {
   app.use(bodyParser.json());
   authMiddleware.init();
   app.use(authMiddleware.protectWithJwt);
};

module.exports = {
   setupMiddleware
};