"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testimonial_1 = require("../controllers/testimonial");
const router = express_1.default.Router();
router.get("/", testimonial_1.gettesTestimonial);
router.post("/", testimonial_1.setsetTestimonial);
router.put("/", testimonial_1.deleteTestimonial);
router.put("/update", testimonial_1.updateTestimonial);
exports.default = router;
