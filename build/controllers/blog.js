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
exports.update_blog = exports.updateImageinBlog = exports.deleteblogs = exports.createblog = exports.getblogs = void 0;
const express_1 = __importDefault(require("express"));
const expressfb = require("express");
const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const formidable = require("formidable-serverless");
const ObjectId = require("mongodb").ObjectID;
const credentials_1 = __importDefault(require("../credentials"));
const credentials_2 = require("../credentials");
const blogModel_1 = __importDefault(require("../models/blogModel"));
const router = express_1.default.Router();
const app = expressfb();
app.use(expressfb.json({ limit: "50mb", extended: true }));
app.use(expressfb.urlencoded({ extended: false, limit: "50mb" }));
var admin = require("firebase-admin");
const photoUrl = "https://firebasestorage.googleapis.com/v0/b/uploadphotos-4ccff.appspot.com/o/";
var serviceAccount = credentials_1.default;
const getblogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blogModel_1.default.find({});
    res.status(200).json(blogs);
});
exports.getblogs = getblogs;
// @desc Add New Post
// @Route /blog
const createblog = (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    try {
        form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
            const profileImage = files.profileImage;
            let blog = new blogModel_1.default({
                photoUrl: "",
                photoName: "",
                postTitle: fields.postTitle,
                postContent: fields.postContent,
                tags: fields.tags,
                author: fields.author,
                category: fields.category,
            });
            let imageUrl;
            const docID = credentials_2.blogRef.doc().id;
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
                const imageResponse = yield credentials_2.bucket.upload(profileImage.path, {
                    destination: `blogs/${profileImage.name}`,
                    resumable: true,
                    metadata: {
                        metadata: {
                            firebaseStorageDownloadTokens: blog.id,
                        },
                    },
                });
                // profile image url
                imageUrl = "" + encodeURIComponent(imageResponse[0].name) +
                    "?alt=media&token=" +
                    blog.id;
            }
            let newblog = {
                photoUrl: profileImage.size == 0 ? "" : imageUrl,
            };
            blog.photoUrl = photoUrl + newblog.photoUrl;
            blog.photoName = profileImage.name;
            uploadOnfireStore(credentials_2.blogRef, docID, newblog, res, blog);
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
exports.createblog = createblog;
function uploadOnfireStore(blogRef, docID, newblog, res, blog) {
    return __awaiter(this, void 0, void 0, function* () {
        yield blogRef
            .doc(docID)
            .set(newblog, { merge: true })
            .then((value) => {
            blog.save();
            res.status(200).send({
                message: "blog created successfully",
                data: blog,
                error: {},
            });
        });
    });
}
const deleteblogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    const blog = yield blogModel_1.default.find({ _id: ObjectId(id) });
    console.log(blog);
    try {
        if (blog != null) {
            try {
                deleteimage(blog[0].photoName);
            }
            catch (err) {
                res.status(200).json(blog[0].photoName + "photo not found");
            }
            res.status(200).json(yield blogModel_1.default.deleteOne({ _id: req.body._id }));
        }
    }
    catch (err) {
        res.status(200).json(req.body._id + " is not found");
    }
});
exports.deleteblogs = deleteblogs;
function deleteimage(photoName) {
    try {
        const file = credentials_2.bucket.file("blogs/" + photoName);
        file.delete();
    }
    catch (err) {
        return err;
    }
}
function findBlogData(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = _id;
        const blog = yield blogModel_1.default.find({ _id: ObjectId(id) });
        return blog;
    });
}
const updateImageinBlog = function updateImage(profileImage, id, photoName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("in blog updating image", id);
        const blog = yield blogModel_1.default.find({ _id: ObjectId(id) });
        try {
            console.log("in side try");
            const imageResponse = yield credentials_2.bucket.upload(profileImage.path, {
                destination: `blogs/${profileImage.name}`,
                resumable: true,
                metadata: {
                    metadata: {
                        firebaseStorageDownloadTokens: blog[0]._id,
                    },
                },
            });
            const imageUrl = encodeURIComponent(imageResponse[0].name) +
                "?alt=media&token=" + blog[0]._id;
            blog[0].photoUrl = photoUrl + imageUrl;
            blog[0].photoName = photoName;
            blog[0].save();
            return blog;
        }
        catch (err) {
            return err;
        }
    });
};
exports.updateImageinBlog = updateImageinBlog;
const update_blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body._id;
    try {
        yield blogModel_1.default.findByIdAndUpdate(id, req.body);
        res.send(req.body);
    }
    catch (err) {
        res.send(err);
    }
});
exports.update_blog = update_blog;
exports.default = router;
