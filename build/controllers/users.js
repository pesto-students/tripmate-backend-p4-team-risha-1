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
exports.createUser = exports.getUserProfile = exports.authUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
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
    console.log(password);
    let newUser = new userModel_1.default({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(password, 10),
        name: req.body.name,
        isAdmin: false,
    });
    newUser.save(function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send("user created" + result);
        }
    });
});
exports.createUser = createUser;
