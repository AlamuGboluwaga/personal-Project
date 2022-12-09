import bcrypt, { genSalt } from "bcryptjs";
import { TodoInstance } from "../model/userSchema";
import express, { Request, Response, NextFunction } from "express";
import { passwordresetJoi } from "../utils/joiValidator";

export const passwordreset = async (req: Request, res: Response) => {
  const validate = passwordresetJoi.validate(req.body);
  const user = await TodoInstance.findOne({
    where: { username: req.body.username },
  });
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (!user) {
    return res
      .status(401)
      .json({ message: `User ${req.body.username}Not Found` });
  }
 const changedPassword = await user?.update({password: hashedPassword})
  return res.status(200).json({ message: "Password Changed Successfully" });
};
