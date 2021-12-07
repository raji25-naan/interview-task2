"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureJWTStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_model_1 = require("../Models/User/user.model");
let configureJWTStrategy = () => {
    console.log("inside jwt");
    const opts = {
        jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "ASDFGHJKL"
    };
    // opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    // opts["secretOrKey"] = "ASDFGHJKL";
    passport_1.default.use(new passport_jwt_1.default.Strategy(opts, (payload, done) => {
        user_model_1.UserModel.findOne({ _id: payload.id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            return done(null, false);
            // or you could create a new account
        });
    }));
};
exports.configureJWTStrategy = configureJWTStrategy;
//# sourceMappingURL=passport-jwt.js.map