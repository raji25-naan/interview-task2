import bodyParser from 'body-parser';
import cors from 'cors';
import { configureJWTStrategy } from './Middlewares/passport-jwt';
import user from './Router/User/user.routes';
import post from './Router/User/post.routes'


export let initialize = (app) => {

    /*bodyParser */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : false}));

    /*cors */
    app.use(cors());
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    configureJWTStrategy();

    /*router */
    app.use('/api/user', user);
    app.use('/api/post', post)
    
}