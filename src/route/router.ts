import express from "express";
import {
  createUser,
  getAll,
  getOne,
  updateUser,
  deleteUser,
} from "../Controller/controler";
const router = express.Router();

router.post("/create",createUser);
router.get("/readall", getAll);
router.get("/readone/:id", getOne);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
