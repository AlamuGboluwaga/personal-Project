"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getOne = exports.getAll = exports.createUser = void 0;
const userSchema_1 = require("../model/userSchema");
const uuid_1 = require("uuid");
const joiValidator_1 = require("../utils/joiValidator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { verifyToken } from "./token";
const createUser = async (req, res, next) => {
    try {
        const validate = joiValidator_1.authSchema.validate(req.body, joiValidator_1.Option);
        if (validate.error)
            return res.status(404).json({ Error: validate.error.details[0].message });
        const id = (0, uuid_1.v4)();
        const userNameExists = await userSchema_1.TodoInstance.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (userNameExists) {
            return res.status(406).json({ Error: "User Name Already Exists" });
        }
        const userEmailExists = await userSchema_1.TodoInstance.findOne({
            where: { email: req.body.email },
        });
        if (userEmailExists) {
            return res.status(409).json({
                Errormsg: "This email is not availbale. Kindly choose another email",
            });
        }
        const userPhoneNumberExist = await userSchema_1.TodoInstance.findOne({
            where: { phonenumber: req.body.phonenumber },
        });
        if (userPhoneNumberExist) {
            return res.status(402).json({ Error: "Phone number already Exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 10);
        const verified = jsonwebtoken_1.default.verify(req.body.token, process.env.secretKey);
        if (!verified) {
            return res.sendStatus(401).json({ Error: "Invalid Token" });
        }
        else
            return res.sendStatus(200).json({ message: "Welcome" });
        next();
        const User = await userSchema_1.TodoInstance.create({
            id: id,
            username: req.body.username,
            firstname: req.body.firstname,
            middlename: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: hashedPassword,
            confirmpassword: hashedPassword,
        });
        const user = { username: req.body.username };
        const token = jsonwebtoken_1.default.sign(user, process.env.secretKey);
        return res
            .status(201)
            .header("X-auth-token", token)
            .json({ message: token });
    }
    catch (error) {
        return res.status(406).json({ Error: "Title not Found" });
    }
};
exports.createUser = createUser;
const getAll = async (req, res) => {
    try {
        const Users = await userSchema_1.TodoInstance.findAll();
        return res.send(Users);
    }
    catch (error) {
        return res.status(404).json({ Error: "No User Found" });
    }
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const Users = await userSchema_1.TodoInstance.findOne({ where: { id: id } });
        if (!Users) {
            return res.status(404).json({ Error: "User not Found" });
        }
        if (Users) {
            return res.status(302).json({ message: 'User found' });
        }
        return res.send(Users);
    }
    catch (error) {
        return res.status(404).json({ Error: "No User Found" });
    }
};
exports.getOne = getOne;
const updateUser = async (req, res) => {
    try {
        const validate = joiValidator_1.authSchema.validate(req.body, joiValidator_1.Option);
        if (validate.error) {
            return res.status(404).json({ Error: validate.error.details[0].message });
        }
        const { id } = req.params;
        const Users = await userSchema_1.TodoInstance.findOne({ where: { id: id } });
        if (!Users) {
            return res.status(404).json({ message: "User not Found" });
        }
        const updatedUser = await Users?.update(req.body);
        return res.status(200).json({ message: "User Successful Updated" });
    }
    catch (error) {
        return res.status(404).json({ message: "No User Found" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const User = await userSchema_1.TodoInstance.findOne({ where: { id: id } });
        if (!User) {
            return res.status(404).json({ message: "User not Found" });
        }
        const deleteUser = await User.destroy();
        return res.status(200).json({ message: "User Successfully Deleted" });
    }
    catch (error) {
        return res.status(404).json({ message: "User not Deleted" });
    }
};
exports.deleteUser = deleteUser;
{
    name: "moses";
}
