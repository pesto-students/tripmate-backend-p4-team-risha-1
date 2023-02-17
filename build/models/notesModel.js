"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tourSchema = new mongoose_1.Schema({
    tour_id: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    }
});
const Notes = (0, mongoose_1.model)("Notes", tourSchema);
exports.default = Notes;
