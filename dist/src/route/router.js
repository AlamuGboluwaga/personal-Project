"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controler_1 = require("../Controller/controler");
const router = express_1.default.Router();
router.post("/create", controler_1.createUser);
router.get("/readall", controler_1.getAll);
router.get("/readone/:id", controler_1.getOne);
router.put("/update/:id", controler_1.updateUser);
router.delete("/delete/:id", controler_1.deleteUser);
exports.default = router;
