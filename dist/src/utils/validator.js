"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordresetOption = exports.passwordresetJoi = exports.authlogin = exports.Option = exports.authSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.authSchema = joi_1.default.object({
    username: joi_1.default.string().min(4).max(255).required(),
    firstname: joi_1.default.string().min(4).max(255).required(),
    middlename: joi_1.default.string().min(4).max(255).required(),
    lastname: joi_1.default.string().min(4).max(255).required(),
    email: joi_1.default.string().lowercase().email().min(4).max(255).trim().required(),
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
exports.authlogin = joi_1.default.object({
    username: joi_1.default.string().min(4).max(255).required(),
    email: joi_1.default.string().lowercase().email().min(4).max(255).trim().required(),
    password: joi_1.default.string().min(8).max(1024).trim().required(),
    confirmpassword: joi_1.default.ref("password"),
}).with("password", "confirmpassword");
const loginOption = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
exports.passwordresetJoi = joi_1.default.object({
    username: joi_1.default.string().min(4).max(255).required(),
    password: joi_1.default.string().min(8).max(1024).required(),
    confirmpassword: joi_1.default.ref("password"),
}).with("password", "confirmpassword");
exports.passwordresetOption = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
