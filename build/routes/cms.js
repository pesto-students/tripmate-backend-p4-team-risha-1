"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cms_1 = require("../controllers/cms");
const router = express_1.default.Router();
router.get("/", cms_1.getCMSdetails);
router.post("/", cms_1.setcmsdetails);
router.put("/", cms_1.deletecms);
router.put("/update", cms_1.updatecms);
exports.default = router;
