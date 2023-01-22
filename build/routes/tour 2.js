"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tour_1 = require("../controllers/tour");
const router = express_1.default.Router();
router.get("/", tour_1.gettourdetails);
router.post("/", tour_1.setTourdetails);
exports.default = router;
