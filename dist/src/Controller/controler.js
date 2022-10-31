"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getOne = exports.getAll = exports.createUser = void 0;
const userSchema_1 = require("./../model/userSchema");
const uuid_1 = require("uuid");
const validator_1 = require("../validator/validator");
const createUser = async (req, res, next) => {
    try {
        const validate = validator_1.authSchema.validate(req.body, validator_1.Option);
        if (validate.error)
            return res.status(404).json({ Error: validate.error.details[0].message });
        const id = (0, uuid_1.v4)();
        const recordExists = await userSchema_1.TodoInstance.findOne({
            where: { title: req.body.title },
        });
        if (recordExists) {
            return res.status(406).json({ message: "User Already Exists" });
        }
        const User = await userSchema_1.TodoInstance.create({ ...req.body, id });
        return res.status(200).json({ message: "User Successfully Created" });
    }
    catch (error) {
        return res.status(406).json({ message: "Title not Found" });
    }
};
exports.createUser = createUser;
const getAll = async (req, res) => {
    try {
        const Users = await userSchema_1.TodoInstance.findAll();
        return res.send(Users);
    }
    catch (error) {
        return res.status(404).json({ message: "No User Found" });
    }
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const Users = await userSchema_1.TodoInstance.findOne({ where: { id: id } });
        if (!Users) {
            return res.status(404).json({ message: "User not Found" });
        }
        return res.send(Users);
    }
    catch (error) {
        return res.status(404).json({ message: "No User Found" });
    }
};
exports.getOne = getOne;
const updateUser = async (req, res) => {
    try {
        const validate = validator_1.authSchema.validate(req.body, validator_1.Option);
        if (validate.error) {
            return res.status(404).json({ Error: validate.error.details[0].message });
        }
        const { id } = req.params;
        const title = req.body;
        const Users = await userSchema_1.TodoInstance.findOne({ where: { id: id } });
        if (!Users) {
            return res.status(404).json({ message: "User not Found" });
        }
        const updatedUser = await Users?.update(title);
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
