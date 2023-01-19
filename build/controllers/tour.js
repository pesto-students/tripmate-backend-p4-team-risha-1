"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTourdetails = exports.gettourdetails = void 0;
const uuid_1 = require("uuid");
let tours = [];
const gettourdetails = (req, res) => {
    res.status(200).json(tours);
};
exports.gettourdetails = gettourdetails;
const setTourdetails = (req, res) => {
    let newTour = {
        id: (0, uuid_1.v4)().toString(),
        user_id: req.body.user_id,
        tourName: req.body.tourName,
        tourDetails: req.body.tourDetails,
        rating: req.body.rating,
        feature: req.body.feature,
        category: req.body.category,
        startdt: req.body.startdt,
        enddt: req.body.enddt
    };
    tours.push(newTour);
    res.send("new user created");
};
exports.setTourdetails = setTourdetails;
