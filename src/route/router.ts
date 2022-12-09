import { passwordreset } from '../Controller/passwordreset';
import express from "express";
import { login } from "../Controller/login";
import { verifyToken } from '../Controller/token';
import {
  createUser,
  getAll,
  getOne,
  updateUser,
  deleteUser,
} from "../Controller/userController";
const router = express.Router();

router.post("/create",verifyToken,createUser);
router.get("/readall", getAll);
router.get("/readone/:id", getOne);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/login",login)
router.post("/resetpassword",passwordreset)

export default router;
