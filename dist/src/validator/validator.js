"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = exports.authSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.authSchema = joi_1.default.object({
    title: joi_1.default.string().min(4).required()
});
exports.Option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ""
        }
    }
};
