"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tourSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true,
    },
    tourDetails: {
        type: String,
        required: true,
    },
    tourName: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    feature: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    startdt: {
        type: String,
        required: true,
    },
    enddt: {
        type: String,
        required: true,
    }
});
const Tour = (0, mongoose_1.model)("Tour", tourSchema);
exports.default = Tour;
