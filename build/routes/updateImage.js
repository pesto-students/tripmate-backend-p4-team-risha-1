"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const updateImage_1 = require("../controllers/updateImage");
const router = express_1.default.Router();
router.put("/", updateImage_1.updateImage);
exports.default = router;
