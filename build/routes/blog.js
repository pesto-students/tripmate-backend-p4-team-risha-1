"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_1 = require("../controllers/blog");
const router = express_1.default.Router();
router.get("/", blog_1.getblogs);
router.post("/", blog_1.createblog);
router.delete("/", blog_1.deleteblogs);
exports.default = router;
