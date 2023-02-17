"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTour = exports.deletetour = exports.setTourdetails = exports.gettourdetails = void 0;
const tourModel_1 = __importDefault(require("../models/tourModel"));
const ObjectId = require('mongodb').ObjectID;
const gettourdetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = yield tourModel_1.default.find({});
    res.status(200).json(tour);
});
exports.gettourdetails = gettourdetails;
const setTourdetails = (req, res) => {
    let newTour = new tourModel_1.default({
        user_id: req.body.user_id,
        tourName: req.body.tourName,
        tourDetails: req.body.tourDetails,
        rating: req.body.rating,
        feature: req.body.feature,
        category: req.body.category,
        startdt: req.body.startdt,
        enddt: req.body.enddt
    });
    newTour.save(function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send("Tour added  created" + result);
        }
    });
};
exports.setTourdetails = setTourdetails;
const deletetour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    const tour = yield tourModel_1.default.find({ "_id": ObjectId(id) });
    try {
        if (tour != null) {
            res.status(200).json(yield tourModel_1.default.deleteOne({ _id: req.body._id }));
        }
    }
    catch (err) {
        res.status(200).json(req.body._id + " is not found");
    }
});
exports.deletetour = deletetour;
const updateTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    try {
        yield tourModel_1.default.findByIdAndUpdate(id, req.body);
        res.send(req.body);
    }
    catch (err) {
        res.send(err);
    }
});
exports.updateTour = updateTour;
