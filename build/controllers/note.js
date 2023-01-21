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
exports.updatenotes = exports.deletenotes = exports.setnotesdetails = exports.getnotesdetails = void 0;
const notesModel_1 = __importDefault(require("../models/notesModel"));
const ObjectId = require('mongodb').ObjectID;
const getnotesdetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notesModel_1.default.find({});
    res.status(200).json(notes);
});
exports.getnotesdetails = getnotesdetails;
const setnotesdetails = (req, res) => {
    let newNotes = new notesModel_1.default({
        tour_id: req.body.tour_id,
        notes: req.body.notes
    });
    newNotes.save(function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send("Notes added  created" + result);
        }
    });
};
exports.setnotesdetails = setnotesdetails;
const deletenotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    const note = yield notesModel_1.default.find({ "_id": ObjectId(id) });
    try {
        if (note != null) {
            res.status(200).json(yield notesModel_1.default.deleteOne({ _id: req.body._id }));
        }
    }
    catch (err) {
        res.status(200).json(req.body._id + " is not found");
    }
});
exports.deletenotes = deletenotes;
const updatenotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    try {
        yield notesModel_1.default.findByIdAndUpdate(id, req.body);
        res.send(req.body);
    }
    catch (err) {
        res.send(err);
    }
});
exports.updatenotes = updatenotes;
