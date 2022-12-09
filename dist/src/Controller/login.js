"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
// import { verifyToken } from './token';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../model/userSchema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const joiValidator_1 = require("../utils/joiValidator");
const login = async (req, res) => {
    const validatelogin = joiValidator_1.authlogin.validate({ ...req.body });
    if (validatelogin.error) {
        return res
            .status(400)
            .json({ Error: validatelogin.error.details[0].message });
    }
    const userdetails = (await userSchema_1.TodoInstance.findOne({
        where: [{ username: req.body.username, email: req.body.email }],
    }));
    if (!userdetails) {
        return res.status(401).json({ Error: "Invalid Username or Password" });
    }
    const comparehashedPassword = await bcryptjs_1.default.compare(req.body.password, userdetails.password);
    if (!comparehashedPassword) {
        return res.status(401).json({ Error: "Invalid password" });
    }
    const token = jsonwebtoken_1.default.sign({ username: req.body.username }, process.env.secretKey);
    res.json({ message: `Welcome ${req.body.username}`, token });
    // const token = req.header("x-auth-token")
    // const verifyToken = jwt.verify(token, process.env.secretKey as string)
    // if (!verifyToken) {
    //   return res.status(403).json({messsage:"Invalid Token"})
    // }
    // return res.status(200).json({message:`Welcome,${req.body.username}`})
};
exports.login = login;
