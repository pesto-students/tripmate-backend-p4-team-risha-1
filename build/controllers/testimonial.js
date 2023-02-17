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
exports.updateTestimonial = exports.deleteTestimonial = exports.setsetTestimonial = exports.gettesTestimonial = void 0;
const testimonialModel_1 = __importDefault(require("../models/testimonialModel"));
const ObjectId = require('mongodb').ObjectID;
const gettesTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const testimonial = yield testimonialModel_1.default.find({});
    res.status(200).json(testimonial);
});
exports.gettesTestimonial = gettesTestimonial;
const setsetTestimonial = (req, res) => {
    let newNotes = new testimonialModel_1.default({
        userName: req.body.userName,
        content: req.body.content
    });
    newNotes.save(function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send("Testimonial  created" + result);
        }
    });
};
exports.setsetTestimonial = setsetTestimonial;
const deleteTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    const testimonial = yield testimonialModel_1.default.find({ "_id": ObjectId(id) });
    try {
        if (testimonial != null) {
            res.status(200).json(yield testimonialModel_1.default.deleteOne({ _id: req.body._id }));
        }
    }
    catch (err) {
        res.status(200).json(req.body._id + " is not found");
    }
});
exports.deleteTestimonial = deleteTestimonial;
const updateTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    try {
        yield testimonialModel_1.default.findByIdAndUpdate(id, req.body);
        res.send(req.body);
    }
    catch (err) {
        res.send(err);
    }
});
exports.updateTestimonial = updateTestimonial;
