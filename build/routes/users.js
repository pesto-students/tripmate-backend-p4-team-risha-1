"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
let password = function (x) {
    return x;
};
let users = [];
router.get("/", users_1.getUsers);
router.post("/", users_1.createUser);
router.patch("/:id", (req, res) => {
    res.send(users.filter((user) => user.id === req.params.id));
});
exports.default = router;
