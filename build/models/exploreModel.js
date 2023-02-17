"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const exploreSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    context: {
        type: String,
        required: true,
    },
    photoName: {
        type: String,
        required: true,
    }
});
const Explore = (0, mongoose_1.model)("Explore", exploreSchema);
exports.default = Explore;
