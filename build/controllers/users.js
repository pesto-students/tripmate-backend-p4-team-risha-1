"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatecms = exports.deleteuser = exports.createUser = exports.getUserProfile = exports.authUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const ObjectId = require('mongodb').ObjectID;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.status(200).json(users);
    const users = yield userModel_1.default.find({});
    res.status(200).json(users);
});
exports.getUsers = getUsers;
const authUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(404);
            res.send("User not found");
            return;
        }
        const verify = yield bcrypt_1.default.compare(password, user.password);
        if (verify) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: (0, generateToken_1.default)(user._id.toString()),
            });
        }
        else {
            res.status(403);
            res.send("Invalid email or password");
        }
    });
};
exports.authUser = authUser;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});
exports.getUserProfile = getUserProfile;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, name } = req.body;
    const userExist = yield userModel_1.default.findOne({ email });
    const saltRound = 10;
    //const password: string = req.body.password;
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = yield userModel_1.default.create({
        name,
        email,
        username,
        password: bcrypt_1.default.hashSync(password, 10),
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id.toString()),
        });
    }
    else {
        res.status(400);
        throw new Error("invalid data");
    }
    // let newUser = new User({
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: bcrypt.hashSync(password, 10),
    //   name: req.body.name,
    //   isAdmin: false,
    // });
    // newUser.save(function (err, result) {
    //   if (err) {
    //     console.log(err);
    //     res.send(err);
    //   } else {
    //     res.send("user created" + result);
    //   }
    // });
});
exports.createUser = createUser;
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    const cms = yield userModel_1.default.find({ "_id": ObjectId(id) });
    try {
        if (cms != null) {
            res.status(200).json(yield userModel_1.default.deleteOne({ _id: req.body._id }));
        }
    }
    catch (err) {
        res.status(200).json(req.body._id + " is not found");
    }
});
exports.deleteuser = deleteuser;
const updatecms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    try {
        yield userModel_1.default.findByIdAndUpdate(id, req.body);
        res.send(req.body);
    }
    catch (err) {
        res.send(err);
    }
});
exports.updatecms = updatecms;
