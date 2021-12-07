"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user = new mongoose_1.default.Schema({
    image: {
        type: String
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    mobileNo: {
        type: Number,
    },
    otp: {
        type: Number
    },
    otpVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
});
exports.UserModel = mongoose_1.default.model('user', user);
//# sourceMappingURL=user.model.js.map