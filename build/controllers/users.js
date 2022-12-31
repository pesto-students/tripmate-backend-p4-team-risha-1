"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
let users = [];
const getUsers = (req, res) => {
    res.status(200).json(users);
};
exports.getUsers = getUsers;
const createUser = (req, res) => {
    const saltRound = 10;
    const password = req.body.password;
    let encryptedPassword;
    //bcrypt.genSalt(saltRound).then(())
    let newUser = {
        id: (0, uuid_1.v4)().toString(),
        username: req.body.username,
        email: req.body.email,
        password: bcrypt_1.default.hash(req.body.password, 10, (err, hash) => hash),
        name: req.body.name,
    };
    users.push(newUser);
    res.send("Congratulation.....🎉✨new user created");
};
exports.createUser = createUser;
