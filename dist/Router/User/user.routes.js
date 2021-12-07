"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../Controller/User/user.controller");
const router = express_1.Router();
router.post('/otpSend', user_controller_1.otpSend);
router.post('/otpVerification', user_controller_1.otpVerification);
router.post('/signup', user_controller_1.signup);
// router.post('/login',login);
exports.default = router;
//# sourceMappingURL=user.routes.js.map