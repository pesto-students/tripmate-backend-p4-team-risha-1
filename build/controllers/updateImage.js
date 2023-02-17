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
exports.updateImage = void 0;
const express_1 = __importDefault(require("express"));
const expressfb = require("express");
const router = express_1.default.Router();
const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const formidable = require("formidable-serverless");
const ObjectId = require("mongodb").ObjectID;
const blog_1 = require("../controllers/blog");
const explore_1 = require("../controllers/explore");
const updateImage = (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    try {
        form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
            const profileImage = files.profileImage;
            let _id = fields._id;
            let content = fields.content;
            let photoName = fields.photoName;
            switch (content) {
                case "Blog":
                    return res.send((0, blog_1.updateImageinBlog)(profileImage, _id, photoName));
                    break;
                case "Explore":
                    return res.send((0, explore_1.updateImageinExplore)(profileImage, _id, photoName));
                    break;
                default: return;
            }
        }));
    }
    catch (err) {
        res.send({
            message: "Something went wrong",
            data: {},
            error: err,
        });
    }
};
exports.updateImage = updateImage;
exports.default = router;
