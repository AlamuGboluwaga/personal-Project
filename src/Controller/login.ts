// import { verifyToken } from './token';
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { TodoInstance } from "../model/userSchema";
import bcrypt, { genSalt } from "bcryptjs";
import { authlogin } from "../utils/joiValidator";


export const login = async (req: Request, res: Response) => {
  const validatelogin = authlogin.validate({ ...req.body });
  if (validatelogin.error) {
    return res
      .status(400)
      .json({ Error: validatelogin.error.details[0].message });
  }
  const userdetails = (await TodoInstance.findOne({
    where: [{ username: req.body.username, email: req.body.email }],
  })) as unknown as { [key: string]: string };

  if (!userdetails) {
    return res.status(401).json({ Error: "Invalid Username or Password" });
  }
  const comparehashedPassword = await bcrypt.compare(
    req.body.password,
    userdetails.password
  );
  if (!comparehashedPassword) {
    return res.status(401).json({ Error: "Invalid password" });
  }

  const token = jwt.sign({ username: req.body.username }, process.env.secretKey as string)
    res.json({message:`Welcome ${req.body.username}`, token })
 ;
  
  // const token = req.header("x-auth-token")
  // const verifyToken = jwt.verify(token, process.env.secretKey as string)
  // if (!verifyToken) {
  //   return res.status(403).json({messsage:"Invalid Token"})
  // }
  // return res.status(200).json({message:`Welcome,${req.body.username}`})

};
