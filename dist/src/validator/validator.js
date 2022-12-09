"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = exports.authSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.authSchema = joi_1.default.object({
    username: joi_1.default.string().min(4).max(255).required(),
    firstname: joi_1.default.string().min(4).max(255).required(),
    middlename: joi_1.default.string().min(4).max(255).required(),
    lastname: joi_1.default.string().min(4).max(255).required(),
    email: joi_1.default.string().email().min(4).max(255).required(),
    phonenumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    password: joi_1.default.string().min(8).max(1024).required(),
    confirmpassword: joi_1.default.ref("password"),
}).with("password", "confirmpassword");
exports.Option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
