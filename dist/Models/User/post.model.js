"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const post = new mongoose_1.default.Schema({
    postImage: {
        type: String
    },
    text: {
        type: String
    }
});
exports.PostModel = mongoose_1.default.model('post', post);
//# sourceMappingURL=post.model.js.map