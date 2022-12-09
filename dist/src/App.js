"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./route/router"));
const dotenv_1 = __importDefault(require("dotenv"));
// import "./config/"
dotenv_1.default.config();
database_config_1.default.sync().then(() => {
    console.log("Connected to Database");
});
// if (!config.get("jwtPrivateKey")) {
//   console.error("FATA ERROR :jwtPrivateKey is not defined.");
//   process.exit(1);
// }
const app = (0, express_1.default)();
const port = 9001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", router_1.default);
app.listen(port, () => {
    console.log(`Server is ON on Port ${port}`);
});
