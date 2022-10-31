import express, { Request, Response, NextFunction } from "express";
import db from "./config/database.config";
import { authSchema } from "./validator/validator";
import cors from "cors";
import router from "./route/router";

db.sync().then(() => {
  console.log("Connect to Database");
});
const app = express();
const port = 9000;

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is ON on Port ${port}`);
});
// function force(force: any, arg1: boolean) {
//   throw new Error("Function not implemented.");
// }
