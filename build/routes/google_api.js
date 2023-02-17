"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_api_1 = require("../controllers/google_api");
const router = express_1.default.Router();
router.post("/", google_api_1.fetchPlaces);
exports.default = router;
