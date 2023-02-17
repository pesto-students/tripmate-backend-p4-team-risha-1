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
exports.updatecms = exports.deletecms = exports.setcmsdetails = exports.getCMSdetails = void 0;
const cmsModel_1 = __importDefault(require("../models/cmsModel"));
const ObjectId = require('mongodb').ObjectID;
const getCMSdetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cms = yield cmsModel_1.default.find({});
    res.status(200).json(cms);
});
exports.getCMSdetails = getCMSdetails;
const setcmsdetails = (req, res) => {
    let newcms = new cmsModel_1.default({
        front_page_detail: req.body.front_page_detail,
        popular: req.body.popular,
        about_us: req.body.about_us
    });
    newcms.save(function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send("CMS added  created" + result);
        }
    });
};
exports.setcmsdetails = setcmsdetails;
const deletecms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    const cms = yield cmsModel_1.default.find({ "_id": ObjectId(id) });
    try {
        if (cms != null) {
            res.status(200).json(yield cmsModel_1.default.deleteOne({ _id: req.body._id }));
        }
    }
    catch (err) {
        res.status(200).json(req.body._id + " is not found");
    }
});
exports.deletecms = deletecms;
const updatecms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    try {
        yield cmsModel_1.default.findByIdAndUpdate(id, req.body);
        res.send(req.body);
    }
    catch (err) {
        res.send(err);
    }
});
exports.updatecms = updatecms;
