import passport from "passport";
import PassportJWT from "passport-jwt";
import { UserModel } from "../Models/User/user.model";


export let configureJWTStrategy = () => {

  console.log("inside jwt");
    const opts = {
      jwtFromRequest :PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey : "ASDFGHJKL"
    };
    // opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    // opts["secretOrKey"] = "ASDFGHJKL";
    passport.use(
      new PassportJWT.Strategy(opts, (payload, done) => {
        UserModel.findOne({ _id: payload.id }, (err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          }
          return done(null, false);
          // or you could create a new account
        });
      })
    );
  };