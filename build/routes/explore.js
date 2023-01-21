"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const explore_1 = require("../controllers/explore");
const router = express_1.default.Router();
router.get("/", explore_1.getexploredetails);
router.post("/", explore_1.setexploredetails);
router.put("/", explore_1.delete_explore);
exports.default = router;
