"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./route/router"));
database_config_1.default.sync().then(() => {
    console.log("Connect to Database");
});
const app = (0, express_1.default)();
const port = 9000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/books', router_1.default);
// app.post("/create", async (req, res, next) => {
//   const id = uuidv4();
//   try {
//     const validationResult = await authSchema.validateAsync(req.body);
//     if (!validationResult) {
//       return res.status(409).json({message:"User already Exits"})
//     }
//     const user = await TodoInstance.create({ ...req.body, id });
//     return res.json({ user, msg: `Successfully Created` });
//   } catch (error) {
//     return res.json({ msg: "fail to create", status: 500, route: "/create" });
//   }
// });
// app.get("/readall", async (req, res, next) => {
//   const allUsers = await TodoInstance.findAll({ where: {} });
//   return res.send(allUsers);
// });
// app.get("/readone/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const aUser = await TodoInstance.findOne({ where: { id: id } });
//   return res.send(aUser);
// });
// app.put("/update/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const title = req.body;
//   const record = await TodoInstance.findOne({ where: { id: id } });
//   if (!record) {
//     return res.status(404).json({ msg: "Record not found" });
//   }
//   const updatedRecord = await record?.update(title);
//   return res.json({ msg: "Record Successfully Updated" });
// });
// app.delete("/deleteuser/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const record = await TodoInstance.findOne({ where: { id: id } });
//   if (!record) {
//     return res.status(404).json({ message: "Record not found" });
//   }
//   const user = await record?.destroy();
//   return res.json({ mesaage: "successfully delete" });
// });
app.listen(port, () => {
    console.log(`Server is ON on Port ${port}`);
});
