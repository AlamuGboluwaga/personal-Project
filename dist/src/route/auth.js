"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const validator_1 = require("../validator/validator");
const validator_2 = require("../validator/validator");
const uuid_1 = require("uuid");
const userSchema_1 = require("./../model/userSchema");
const createUser = async (req, res, next) => {
    try {
        const validate = validator_1.authSchema.validate(req.body, validator_2.Option);
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
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const User = await userSchema_1.TodoInstance.create({
            id: id,
            username: req.body.username,
            firstname: req.body.firstname,
            middlename: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: passwordHash,
            confirmpassword: passwordHash,
        });
        console.log(User);
        return res.send(_.pick(User, [
            "id",
            "username",
            "firstname",
            "middlename",
            "lastname",
            "email",
            "phonenumber",
        ]));
    }
    catch (error) {
        return res.status(406).json({ Error: "Title not Found" });
    }
};
exports.createUser = createUser;
