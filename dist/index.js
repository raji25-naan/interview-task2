"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const passport_jwt_1 = require("./Middlewares/passport-jwt");
const user_routes_1 = __importDefault(require("./Router/User/user.routes"));
const post_routes_1 = __importDefault(require("./Router/User/post.routes"));
let initialize = (app) => {
    /*bodyParser */
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    /*cors */
    app.use(cors_1.default());
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    passport_jwt_1.configureJWTStrategy();
    /*router */
    app.use('/api/user', user_routes_1.default);
    app.use('/api/post', post_routes_1.default);
};
exports.initialize = initialize;
//# sourceMappingURL=index.js.map