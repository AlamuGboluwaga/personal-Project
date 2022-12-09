"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const validator_1 = require("../validator/validator");
const userSchema_1 = require("../model/userSchema");
const login = async (req, res) => {
    const validateUser = validator_1.authSchema.validate({ ...req.body });
    const username = await userSchema_1.TodoInstance.findOne({ where: { username: req.body.username } });
    if (!username) {
        return res.status(401).json({ Error: "Invalid Username " });
    }
    const useremail = await userSchema_1.TodoInstance.findOne({ where: { email: req.body.email } });
    if (!useremail) {
        return res.status(401).json({ Error: "Invalid Email Address" });
    }
    const password = await userSchema_1.TodoInstance.findOne({ where: { password: req.body.password } });
    if (!password) {
        return res.status(401).json({ Error: "Invalid password" });
    }
};
exports.login = login;
