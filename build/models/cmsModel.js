"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cmsSchema = new mongoose_1.Schema({
    front_page_detail: {
        type: String,
        required: true,
    },
    popular: {
        type: String,
        required: true,
    },
    about_us: {
        type: String,
        required: true,
    }
});
const CMS = (0, mongoose_1.model)("CMS", cmsSchema);
exports.default = CMS;
