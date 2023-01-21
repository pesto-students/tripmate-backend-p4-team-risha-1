"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const testimonialSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});
const TESTIMONIAL = (0, mongoose_1.model)("TESTIMONIAL", testimonialSchema);
exports.default = TESTIMONIAL;
