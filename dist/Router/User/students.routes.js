"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const students_controller_1 = require("../../Controller/User/students.controller");
const router = express_1.Router();
router.post('/createStudent', students_controller_1.updateStudent);
router.get('/getAggregate', students_controller_1.getAggregate);
router.get('/getAge', students_controller_1.aggregateAge);
router.post('/aggregateAppend', students_controller_1.aggregateAppend),
    router.get('/lookupExpr', students_controller_1.lookupExpr);
exports.default = router;
//# sourceMappingURL=students.routes.js.map