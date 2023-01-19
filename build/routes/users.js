"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
let password = function (x) {
    return x;
};
let users = [];
router.route("/login").post(users_1.authUser);
router.route("/profile").post(authMiddleware_js_1.protect, users_1.getUserProfile);
router.get("/", (0, express_async_handler_1.default)(users_1.getUsers));
router.post("/", (0, express_async_handler_1.default)(users_1.createUser));
router.patch("/:id", (req, res) => {
    res.send(users.filter((user) => user.id === req.params.id));
});
exports.default = router;
