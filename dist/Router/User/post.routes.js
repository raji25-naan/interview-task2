"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../../Controller/User/post.controller");
const router = express_1.Router();
const passport_1 = __importDefault(require("passport"));
router.post('/createPost', passport_1.default.authenticate('jwt', { session: false }), post_controller_1.createPost);
exports.default = router;
//# sourceMappingURL=post.routes.js.map