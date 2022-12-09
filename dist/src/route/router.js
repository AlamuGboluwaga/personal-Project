"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passwordreset_1 = require("../Controller/passwordreset");
const express_1 = __importDefault(require("express"));
const login_1 = require("../Controller/login");
const token_1 = require("../Controller/token");
const userController_1 = require("../Controller/userController");
const router = express_1.default.Router();
router.post("/create", token_1.verifyToken, userController_1.createUser);
router.get("/readall", userController_1.getAll);
router.get("/readone/:id", userController_1.getOne);
router.put("/update/:id", userController_1.updateUser);
router.delete("/delete/:id", userController_1.deleteUser);
router.post("/login", login_1.login);
router.post("/resetpassword", passwordreset_1.passwordreset);
exports.default = router;
