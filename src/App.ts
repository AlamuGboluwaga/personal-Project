import config from "config";
import express, { Request, Response, NextFunction } from "express";
import db from "./config/database.config";
import { authSchema } from "./utils/joiValidator";
import cors from "cors";
import router from "./route/router";
import dotenv from "dotenv";
// import "./config/"
dotenv.config();

db.sync().then(() => {
  console.log("Connected to Database");
});

// if (!config.get("jwtPrivateKey")) {
//   console.error("FATA ERROR :jwtPrivateKey is not defined.");
//   process.exit(1);
// }
 
const app = express();
const port = process.env.port; 

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is ON on Port ${port}`);
});
