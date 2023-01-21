"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favTour_1 = require("../controllers/favTour");
const router = express_1.default.Router();
router.get("/", favTour_1.getfavTourdetails);
router.post("/", favTour_1.setfavTourdetails);
router.put("/", favTour_1.deletefavTour);
router.put("/update", favTour_1.updatefavTour);
exports.default = router;
