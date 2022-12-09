"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const secretKey = process.env.SecretKey;
// export const verifyToken = (req:Request,res:Response,next:NextFunction) => {
// const authorization = req.headers.authorization;
// const token = (authorization?.slice(7, authorization.length) as string) ||req.cookies.mytoken;
//      const verified = jwt.verify(token, secretKey);
// }
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(" ")[1];
        req.headers.token = bearerToken;
        return res.sendStatus(200).json({ message: "Sucessfully Verified" });
    }
    return res.sendStatus(403).json("token Not valid");
};
exports.verifyToken = verifyToken;
