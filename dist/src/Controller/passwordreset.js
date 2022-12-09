"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordreset = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema_1 = require("../model/userSchema");
const joiValidator_1 = require("../utils/joiValidator");
const passwordreset = async (req, res) => {
    const validate = joiValidator_1.passwordresetJoi.validate(req.body);
    const user = await userSchema_1.TodoInstance.findOne({
        where: { username: req.body.username },
    });
    const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 10);
    if (!user) {
        return res
            .status(401)
            .json({ message: `User ${req.body.username}Not Found` });
    }
    const changedPassword = await user?.update({ password: hashedPassword });
    return res.status(200).json({ message: "Password Changed Successfully" });
};
exports.passwordreset = passwordreset;
