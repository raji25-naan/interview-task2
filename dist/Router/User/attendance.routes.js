"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const passport_1 = __importDefault(require("passport"));
const attendance_controller_1 = require("../../Controller/User/attendance.controller");
router.post('/save', attendance_controller_1.updateAttendance);
router.get('/list', passport_1.default.authenticate('jwt', { session: false }), attendance_controller_1.listAttendanceByMonth);
router.get('/getStudent', attendance_controller_1.getStudent);
router.get('/test', attendance_controller_1.test);
exports.default = router;
//# sourceMappingURL=attendance.routes.js.map