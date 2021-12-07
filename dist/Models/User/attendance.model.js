"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const attendance = new mongoose_1.default.Schema({
    student_id: {
        type: String,
        required: true
    },
    present_or_absent: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        required: true
    }
});
exports.AttendanceModel = mongoose_1.default.model('attendance', attendance);
//# sourceMappingURL=attendance.model.js.map