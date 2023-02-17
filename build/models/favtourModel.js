"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const favTourSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true,
    },
    tour_id: {
        type: String,
        required: true,
    }
});
const FavTour = (0, mongoose_1.model)("FavTour", favTourSchema);
exports.default = FavTour;
