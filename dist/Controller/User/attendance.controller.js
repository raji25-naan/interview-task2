"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.getStudent = exports.listAttendanceByMonth = exports.updateAttendance = void 0;
const attendance_model_1 = require("../../Models/User/attendance.model");
const updateAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("updateAttendance");
        // if(req.user.type == "superadmin")                        
        // {
        // if(req.query.student_id)
        // {
        //     console.log("fir");
        //     const updateData = await AttendanceModel.findOneAndUpdate({student_id : req.params.student_id },
        //         {
        //             $set : {
        //                 student_id : req.body.student_id,
        //                 present_or_absent : req.body.present_or_absent,
        //                 date : new Date(),
        //                 created_by : req.user.name,
        //                 created_on : new Date()
        //             }
        //         },{new : true}
        //         )
        //     if(updateData)
        //     {
        //         return res.send(updateData);
        //     }
        // }
        // else
        // {
        let reqData = {
            student_id: "54789632145789654",
            present_or_absent: req.body.present_or_absent,
            date: new Date(),
            created_by: "sakthi",
            created_on: new Date()
        };
        const attendanceDocument = new attendance_model_1.AttendanceModel(reqData);
        console.log(attendanceDocument);
        const saveData = yield attendanceDocument.save();
        if (saveData) {
            return res.send(saveData);
        }
        // }
        // }
        // else
        // {
        //     return res.send({Msg : "superadmin only allow to insert data"})
        // }
    }
    catch (err) {
        return res.send(err);
    }
});
exports.updateAttendance = updateAttendance;
const listAttendanceByMonth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let month = req.query.month;
        console.log(month);
        const getList = yield attendance_model_1.AttendanceModel.aggregate([
            { $project: { Month: { $month: '$date' } } },
            { $match: { date: new Date() } }
        ]).exec();
        console.log(getList);
        return res.send(getList);
    }
    catch (err) {
        return res.send(err);
    }
});
exports.listAttendanceByMonth = listAttendanceByMonth;
const getStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getStudent");
    try {
        const student = yield attendance_model_1.AttendanceModel.aggregate([
            {
                $lookup: {
                    from: "students",
                    localField: "student_id",
                    foreignField: "id",
                    as: "students"
                }
            }
        ]);
        if (student) {
            return res.send(student);
        }
    }
    catch (err) {
        return res.send(err);
    }
});
exports.getStudent = getStudent;
const test = (req, res, next) => {
    console.log("test");
    return res.send({ Msg: "test" });
};
exports.test = test;
//# sourceMappingURL=attendance.controller.js.map