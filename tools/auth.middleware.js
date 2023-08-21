const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const PASSWORD = process.env.PASSWORD;

const init = () => {
   const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: PASSWORD
   };

   passport.use(new JwtStrategy(opts,(decoded,done) => {
      // console.log('decoded jwt',decoded);
      return done(null,decoded);
   }));
};

const protectWithJwt = (req,res,next) => {
   if (req.path == '/' || req.path == '/auth/login')
      return next();

   return passport.authenticate('jwt',{ session: false })(req,res,next);
};

module.exports = {
   init,
   protectWithJwt
};