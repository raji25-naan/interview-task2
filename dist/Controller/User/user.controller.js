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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.otpVerification = exports.otpSend = void 0;
const user_model_1 = require("../../Models/User/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const otpSend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.mobileNo) {
            let userData = yield user_model_1.UserModel.findOne({ mobileNo: req.body.mobileNo });
            if (userData) {
                return res.send({ Msg: "Mobile number was already registered" });
            }
            else {
                let reqData = {
                    mobileNo: req.body.mobileNo,
                    otp: 1031
                };
                const userDocument = new user_model_1.UserModel(reqData);
                const saveData = yield userDocument.save();
                if (saveData) {
                    return res.send(saveData);
                }
            }
        }
        else {
            return res.send({ Msg: "Mobile number is required" });
        }
    }
    catch (error) {
        return res.send(error);
    }
});
exports.otpSend = otpSend;
const otpVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.otp && req.body.mobileNo) {
            let userData = yield user_model_1.UserModel.findOne({ mobileNo: req.body.mobileNo });
            if (userData) {
                if (userData.otp == req.body.otp) {
                    const updateUserData = yield user_model_1.UserModel.findOneAndUpdate({ _id: userData._id }, {
                        $set: {
                            otpVerified: true
                        }
                    }, {
                        new: true
                    });
                    if (updateUserData) {
                        let responseData = [];
                        responseData.push(updateUserData);
                        responseData.push({ "Message": "OTP verified successfully" });
                        return res.send(responseData);
                    }
                }
                else {
                    return res.send({ Msg: "Invalid OTP" });
                }
            }
            else {
                return res.send({ Msg: "Invalid Mobile Number" });
            }
        }
        else {
            return res.send({ Msg: "MobileNumber and OTP is required" });
        }
    }
    catch (error) {
        return res.send(error);
    }
});
exports.otpVerification = otpVerification;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.name && req.body.password && req.body.image && req.body.mobileNo) {
            let { name, password, image, mobileNo } = req.body;
            console.log({ name, image, password, mobileNo });
            let getUserDetails = yield user_model_1.UserModel.findOne({ mobileNo }).exec();
            if (getUserDetails) {
                console.log(getUserDetails);
                console.log(getUserDetails.otpVerified);
                if (getUserDetails.otpVerified === true) {
                    if (password !== null || password !== undefined || password !== '') {
                        const salt = yield bcryptjs_1.default.genSalt();
                        const hash = yield bcryptjs_1.default.hash(password, salt);
                        password = hash;
                    }
                    const secret = "ASDFGHJKL";
                    const token = jsonwebtoken_1.default.sign({ id: getUserDetails._id }, secret, { expiresIn: '1d' });
                    let updateData = yield user_model_1.UserModel.findOneAndUpdate({ _id: getUserDetails._id }, {
                        $set: {
                            name, password, image, token
                        }
                    }, { new: true });
                    if (updateData) {
                        let responseData = [];
                        responseData.push({ "Message": "Registered successfully" });
                        responseData.push(updateData);
                        return res.send(responseData);
                    }
                }
                else {
                    return res.send({ Msg: 'Mobile number is not verified' });
                }
            }
            else {
                return res.send({ Msg: 'Mobile number is Invalid' });
            }
        }
        else {
            return res.send({ Msg: "Field Validation Failed" });
        }
    }
    catch (err) {
        console.error(err);
        return res.send(err);
    }
});
exports.signup = signup;
// export const login = async (req,res,next) => {
//     try
//     {
//        let {mobileNo,password} = req.body;
//        const userInfo = await UserModel.findOne({name}).exec();
//        if(userInfo)
//        {
//         console.log(userInfo['password']);
//         const Matched = await bcryptjs.compare(password,userInfo['password']);
//         console.log('Matched',Matched);
//         if(!Matched)
//         {
//             return res.send({Msg : 'Invalid credential'});
//         }
//         else if(Matched == true)
//         {
//             const secret = "ASDFGHJKL";
//             const token = jwt.sign({id:userInfo._id},secret,{expiresIn:'1d'});
//             let updateToken = await UserModel.findByIdAndUpdate(
//                 {_id : userInfo._id},
//                 {
//                     $set : {
//                         token : token
//                     }
//                 },
//                 {new : true}
//             ).exec();
//             return res.send(updateToken);
//         }
//        }
//        else
//        {
//          return res.send({Msg : 'You are not registered with us !'});
//        }
//     }
//     catch(err)
//     {
//         console.error(err);
//         return res.send(err);
//     }
// }
//# sourceMappingURL=user.controller.js.map