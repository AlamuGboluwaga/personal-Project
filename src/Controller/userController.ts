import { TodoInstance } from "../model/userSchema";
import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { authSchema, Option } from "../utils/joiValidator";
import _ from "lodash";
import bcrypt, { genSalt } from "bcryptjs";
import jwt from "jsonwebtoken";

// import { verifyToken } from "./token";
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = authSchema.validate(req.body, Option);
    if (validate.error)
      return res.status(404).json({ Error: validate.error.details[0].message });

    const id = uuidv4();
    const userNameExists = await TodoInstance.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (userNameExists) {
      return res.status(406).json({ Error: "User Name Already Exists" });
    }
    const userEmailExists = await TodoInstance.findOne({
      where: { email: req.body.email },
    });
    if (userEmailExists) {
      return res.status(409).json({
        Errormsg: "This email is not availbale. Kindly choose another email",
      });
    }
    const userPhoneNumberExist = await TodoInstance.findOne({
      where: { phonenumber: req.body.phonenumber },
    });
    if (userPhoneNumberExist) {
      return res.status(402).json({ Error: "Phone number already Exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const verified = jwt.verify(
      req.body.token,
      process.env.secretKey as string
    );
    if (!verified) {
      return res.sendStatus(401).json({ Error: "Invalid Token" });
    } else return res.sendStatus(200).json({ message: "Welcome" });
    next();

    const User = await TodoInstance.create({
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
    const token = jwt.sign(user, process.env.secretKey as string);
    return res
      .status(201)
      .header("X-auth-token", token)
      .json({ message: token });
  } catch (error) {
    return res.status(406).json({ Error: "Title not Found" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const Users = await TodoInstance.findAll();

    return res.send(Users);
  } catch (error) {
    return res.status(404).json({ Error: "No User Found" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Users = await TodoInstance.findOne({ where: { id: id } });
    if (!Users) {
      return res.status(404).json({ Error: "User not Found" });
    }
    if (Users) {
       return res.status(302).json({message:'User found'})
    }
    return res.send(Users);
  } catch (error) {
    return res.status(404).json({ Error: "No User Found" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const validate = authSchema.validate(req.body, Option);
    if (validate.error) {
      return res.status(404).json({ Error: validate.error.details[0].message });
    }
    const { id } = req.params;
    const Users = await TodoInstance.findOne({ where: { id: id } });
    if (!Users) {
      return res.status(404).json({ message: "User not Found" });
    }
    const updatedUser = await Users?.update(req.body);
    return res.status(200).json({ message: "User Successful Updated" });
  } catch (error) {
    return res.status(404).json({ message: "No User Found" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const User = await TodoInstance.findOne({ where: { id: id } });
    if (!User) {
      return res.status(404).json({ message: "User not Found" });
    }
    const deleteUser = await User.destroy();
    return res.status(200).json({ message: "User Successfully Deleted" });
  } catch (error) {
    return res.status(404).json({ message: "User not Deleted" });
  }
};



{name:"moses"}