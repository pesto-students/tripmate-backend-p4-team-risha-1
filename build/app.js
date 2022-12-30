"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const blog_1 = __importDefault(require("./routes/blog"));
const app = (0, express_1.default)();
const PORT = 4000;
app.get("/", (req, res) => {
    res.send("Hi this is our first page");
});
app.use(express_1.default.json());
// app.use("auth");
//
app.use("/users", users_1.default);
app.use("/blog", blog_1.default);
app.listen(PORT, () => {
    console.log(`Hola Server is running on port ${PORT}`);
});
