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
exports.updatefavTour = exports.deletefavTour = exports.setfavTourdetails = exports.getfavTourdetails = void 0;
const favtourModel_1 = __importDefault(require("../models/favtourModel"));
const ObjectId = require('mongodb').ObjectID;
const getfavTourdetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favTour = yield favtourModel_1.default.find({});
    res.status(200).json(favTour);
});
exports.getfavTourdetails = getfavTourdetails;
const setfavTourdetails = (req, res) => {
    let favTour = new favtourModel_1.default({
        user_id: req.body.user_id,
        tour_id: req.body.tour_id
    });
    favTour.save(function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send("favTour added added  created" + result);
        }
    });
};
exports.setfavTourdetails = setfavTourdetails;
const deletefavTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    const favTour = yield favtourModel_1.default.find({ "_id": ObjectId(id) });
    try {
        if (favTour != null) {
            res.status(200).json(yield favtourModel_1.default.deleteOne({ _id: req.body._id }));
        }
    }
    catch (err) {
        res.status(200).json(req.body._id + " is not found");
    }
});
exports.deletefavTour = deletefavTour;
const updatefavTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    try {
        yield favtourModel_1.default.findByIdAndUpdate(id, req.body);
        res.send(req.body);
    }
    catch (err) {
        res.send(err);
    }
});
exports.updatefavTour = updatefavTour;
