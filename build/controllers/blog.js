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
exports.createblog = exports.getblogs = void 0;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const UUID = require("uuid-v4");
const expressfb = require("express");
const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const formidable = require("formidable-serverless");
const credentials_1 = __importDefault(require("../credentials"));
require("dotenv").config();
const router = express_1.default.Router();
//const credentials = require("../../credfb.json");
const app = expressfb();
app.use(expressfb.json({ limit: "50mb", extended: true }));
app.use(expressfb.urlencoded({ extended: false, limit: "50mb" }));
var admin = require("firebase-admin");
const photoUrl = "https://firebasestorage.googleapis.com/v0/b/uploadphotos-4ccff.appspot.com/o/";
var serviceAccount = credentials_1.default;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const blogRef = admin.firestore().collection("blogref");
const storage = new Storage({
    keyFilename: "./credfb.json",
    //keyFilename: "../credentials",
});
const bucket = storage.bucket("gs://uploadphotos-4ccff.appspot.com");
let blogs = [];
const getblogs = (req, res) => {
    res.status(200).json(blogs);
};
exports.getblogs = getblogs;
router.post("/addPost", (req, res) => {
    let newblog1 = {
        id: (0, uuid_1.v4)().toString(),
        postContent: req.body.postContent,
        tags: req.body.tags,
        author: req.body.author,
        catagory: req.body.catagory,
        photoUrl: "",
        date: req.body.date,
    };
    blogs.push(newblog1);
    res.send("blog added");
});
const createblog = (req, res) => {
    console.log("in post1");
    const form = new formidable.IncomingForm({ multiples: true });
    try {
        form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
            let uuid = UUID();
            let downLoadPath = "";
            const profileImage = files.profileImage;
            let newblog1 = {
                id: (0, uuid_1.v4)().toString(),
                postContent: fields.postContent,
                tags: fields.tags,
                author: fields.author,
                catagory: fields.catagory,
                photoUrl: "",
                date: fields.date,
            };
            console.log(fields);
            // url of the uploaded image
            let imageUrl;
            const docID = blogRef.doc().id;
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
                const imageResponse = yield bucket.upload(profileImage.path, {
                    destination: `blogs/${profileImage.name}`,
                    resumable: true,
                    metadata: {
                        metadata: {
                            firebaseStorageDownloadTokens: newblog1.id,
                        },
                    },
                });
                // profile image url
                imageUrl =
                    downLoadPath +
                        encodeURIComponent(imageResponse[0].name) +
                        "?alt=media&token=" +
                        newblog1.id;
            }
            let newblog = {
                photoUrl: profileImage.size == 0 ? "" : imageUrl,
            };
            newblog1.photoUrl = photoUrl + newblog.photoUrl;
            uploadOnfireStore(blogRef, docID, newblog, res, newblog1);
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
function uploadOnfireStore(blogRef, docID, newblog, res, newblog1) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("in uploadimage function");
        yield blogRef
            .doc(docID)
            .set(newblog, { merge: true })
            .then((value) => {
            blogs.push(newblog1);
            // return response to users
            res.status(200).send({
                message: "user created successfully",
                data: newblog1,
                error: {},
            });
        });
    });
}
router.put("/deletePost", (req, res) => {
    var blogId;
    for (let blog of blogs) {
        var id = req.body.id;
        if (blog._id == id) {
            blogId = blog.id;
            console.log(blogId);
        }
    }
    if (blogId !== -1) {
        blogs.splice(blogId, 1);
    }
    res.send(blogs);
});
exports.default = router;
