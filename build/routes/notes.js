"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_1 = require("../controllers/note");
const router = express_1.default.Router();
router.get("/", note_1.getnotesdetails);
router.post("/", note_1.setnotesdetails);
router.put("/", note_1.deletenotes);
router.put("/update", note_1.updatenotes);
exports.default = router;
