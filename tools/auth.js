const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = passport => {
   const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: 'secretPassword' //TODO debería estar en una variable de entorno
   };

   passport.use(new JwtStrategy(opts,(decoded,done) => {
      // console.log('decoded jwt',decoded);
      return done(null,decoded);
   }));
};