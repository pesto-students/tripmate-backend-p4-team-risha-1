"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
let password = function (x) {
    return x;
};
let users = [];
router.get("/", (req, res) => {
    res.status(200).json(users);
});
router.post("/", (req, res) => {
    let newUser = {
        id: (0, uuid_1.v4)().toString(),
        username: req.body.username,
        email: req.body.email,
        password: bcrypt_1.default.hash(req.body.password, 10, (err, hash) => hash),
        name: req.body.name,
    };
    users.push(newUser);
});
exports.default = router;
