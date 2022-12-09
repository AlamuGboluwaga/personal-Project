"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordreset = void 0;
const userSchema_1 = require("../model/userSchema");
const passwordreset = async (req, res) => {
    const user = await userSchema_1.TodoInstance.findOne({ where: { username: req.body.usename } });
    if (!user) {
        return res.status(400).json({ Error: "User not found" });
    }
    const passwordUpdate = await user?.update(req.body.password);
    return res.status(200).json({ message: "Password Changed Successfully" });
};
exports.passwordreset = passwordreset;
