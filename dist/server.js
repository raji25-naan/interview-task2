"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let app = express_1.default();
const winston_1 = __importDefault(require("winston"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./index");
/* dbConnection */
let db = "mongodb://interviewusr:Interview123dev@13.233.109.157:27012/interview_db";
mongoose_1.default.connect(db)
    .then(() => winston_1.default.info(`Connected to ${db}`))
    .catch(() => winston_1.default.error(`Failed to connect db...`));
/* router */
index_1.initialize(app);
let port = process.env.port || 6000;
let server = app.listen(port, () => { winston_1.default.info(`server is running at PORT ${port}`); });
//# sourceMappingURL=server.js.map