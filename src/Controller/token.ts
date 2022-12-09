import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secretKey = process.env.SecretKey as string;

// export const verifyToken = (req:Request,res:Response,next:NextFunction) => {
// const authorization = req.headers.authorization;
// const token = (authorization?.slice(7, authorization.length) as string) ||req.cookies.mytoken;
//      const verified = jwt.verify(token, secretKey);

// }
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearerToken = bearerHeader.split(" ")[1];
    req.headers.token = bearerToken;
    return res.sendStatus(200).json({ message: "Sucessfully Verified" });
  }
  return res.sendStatus(403).json("token Not valid");
};
