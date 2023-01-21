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
exports.delete_explore = exports.setexploredetails = exports.getexploredetails = exports.updateexploredetails = void 0;
const express_1 = __importDefault(require("express"));
const formidable_serverless_1 = __importDefault(require("formidable-serverless"));
const expressfb = require("express");
const ObjectId = require('mongodb').ObjectID;
const credentials_1 = require("../credentials");
const exploreModel_1 = __importDefault(require("../models/exploreModel"));
const router = express_1.default.Router();
const app = expressfb();
app.use(expressfb.json({ limit: "50mb", extended: true }));
app.use(expressfb.urlencoded({ extended: false, limit: "50mb" }));
const updateexploredetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const explore = yield exploreModel_1.default.findByIdAndUpdate({});
    res.status(200).json(explore);
});
exports.updateexploredetails = updateexploredetails;
const getexploredetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const explore = yield exploreModel_1.default.find({});
    res.status(200).json(explore);
});
exports.getexploredetails = getexploredetails;
const setexploredetails = (req, res) => {
    const form = new formidable_serverless_1.default.IncomingForm({ multiples: true });
    try {
        form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
            const profileImage = files.profileImage;
            let explore = new exploreModel_1.default({
                title: fields.title,
                image_url: "",
                context: fields.postContent,
                photoName: ""
            });
            let imageUrl;
            const docID = credentials_1.blogRef.doc().id;
            if (err) {
                return res.status(400).json({
                    message: "There was an error parsing the files",
                    data: {},
                    error: err,
                });
            }
            if (profileImage.size == 0) {
                // do nothing
            }
            else {
                const imageResponse = yield credentials_1.bucket.upload(profileImage.path, {
                    destination: `blogs/${profileImage.name}`,
                    resumable: true,
                    metadata: {
                        metadata: {
                            firebaseStorageDownloadTokens: explore.id,
                        },
                    },
                });
                // profile image url
                imageUrl =
                    encodeURIComponent(imageResponse[0].name) +
                        "?alt=media&token=" +
                        explore.id;
            }
            let newblog = {
                photoUrl: profileImage.size == 0 ? "" : imageUrl,
            };
            explore.image_url = credentials_1.photoUrl + newblog.photoUrl;
            explore.photoName = profileImage.name;
            uploadOnfireStore(credentials_1.blogRef, docID, newblog, res, explore);
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
exports.setexploredetails = setexploredetails;
function uploadOnfireStore(blogRef, docID, newblog, res, explore) {
    return __awaiter(this, void 0, void 0, function* () {
        yield blogRef
            .doc(docID)
            .set(newblog, { merge: true })
            .then((value) => {
            explore.save();
            res.status(200).send({
                message: "blog created successfully",
                data: explore,
                error: {},
            });
        });
    });
}
const delete_explore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    const explore = yield exploreModel_1.default.find({ "_id": ObjectId(id) });
    try {
        if (explore != null) {
            console.log(explore);
            try {
                const file = credentials_1.bucket.file("blogs/" + explore[0].photoName);
                file.delete();
            }
            catch (err) {
                res.status(200).json(explore[0].photoName + "photo not found");
            }
            res.status(200).json(yield exploreModel_1.default.deleteOne({ _id: req.body._id }));
        }
    }
    catch (err) {
        res.status(200).json(req.body._id + " is not found");
    }
});
exports.delete_explore = delete_explore;
exports.default = router;
