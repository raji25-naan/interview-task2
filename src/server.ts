/* import express from 'express';
let app = express();
import winston from 'winston';
import mongoose from 'mongoose';
import {initialize as init} from './index'


/* dbConnection */
let db = "mongodb://interviewusr:Interview123dev@13.233.109.157:27012/interview_db";

mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}`))
    .catch(() => winston.error(`Failed to connect db...`))

/* router */
init(app);/*  */

let port = process.env.port || 6000;

let server = app.listen(port, () => { winston.info(`server is running at PORT ${port}`) });

 * /