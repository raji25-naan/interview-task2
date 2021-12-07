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
exports.createPost = void 0;
const post_model_1 = require("../../Models/User/post.model");
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.postImage && req.body.text) {
            let { postImage, text } = req.body;
            const postDocument = new post_model_1.PostModel({ postImage, text });
            const saveData = yield postDocument.save();
            if (saveData) {
                let responseData = [];
                responseData.push({ "Message": "Posted Successfully" });
                responseData.push(saveData);
                return res.send(responseData);
            }
        }
        else {
            return res.send({ Msg: "Field Validation Failed" });
        }
    }
    catch (error) {
        return res.send(error);
    }
});
exports.createPost = createPost;
//# sourceMappingURL=post.controller.js.map