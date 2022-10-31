import { TodoInstance } from "./../model/userSchema";
import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4} from "uuid";
import { authSchema,Option } from "../validator/validator";
export const createUser = async (req: Request,res: Response, next: NextFunction
) => {
    try {
        const validate = authSchema.validate(req.body, Option)
        if(validate.error)
        return res.status(404).json({ Error:  validate.error.details[0].message })

    const id = uuidv4();
    const recordExists = await TodoInstance.findOne({
      where: { title: req.body.title },
    });
    if (recordExists) {
      return res.status(406).json({ message: "User Already Exists" });
    }

    const User = await TodoInstance.create({ ...req.body, id });
    return res.status(200).json({ message: "User Successfully Created" });
  } catch (error) {
    return res.status(406).json({ message: "Title not Found" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const Users = await TodoInstance.findAll();

    return res.send(Users);
  } catch (error) {
    return res.status(404).json({ message: "No User Found" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Users = await TodoInstance.findOne({ where: { id: id } });
    if (!Users) {
      return res.status(404).json({ message: "User not Found" });
    }
    return res.send(Users);
  } catch (error) {
    return res.status(404).json({ message: "No User Found" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const validate =  authSchema.validate(req.body,Option)
        if (validate.error) {
            return res.status(404).json({ Error:  validate.error.details[0].message })
        }
    const { id } = req.params;
    const title = req.body;
    const Users = await TodoInstance.findOne({ where: { id: id } });
    if (!Users) {
      return res.status(404).json({ message: "User not Found" });
    }
    const updatedUser = await Users?.update(title);
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
