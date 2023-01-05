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
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const UUID = require("uuid-v4");
const expressfb = require("express");
const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const formidable = require("formidable-serverless");
const multer = require("multer");
require("dotenv").config();
const router = express_1.default.Router();
const app = expressfb();
app.use(expressfb.json({ limit: "50mb", extended: true }));
app.use(expressfb.urlencoded({ extended: false, limit: "50mb" }));
var admin = require("firebase-admin");
var serviceAccount = {
    "type": "service_account",
    "project_id": "uploadphotos-4ccff",
    "private_key_id": "58f05404b7de4518731524a6742e4fdf7d5d7afa",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfS46HhpntR4z/\nH2rpnQwreK7pbabvWc77nwQKS4/7YLRB+ReW8ZiQaUxMwEUGXvd7KOHTTrdNaOF0\nmIWCkteqHpRZcT+r0bLLEhNq20t9FKUX17x9j0GIdKqvMn6+QMvt2wXzUBy/ZGwT\nKbbPImdSGJ40lZ1P/klZKg7y/MsZ66UiETTvN5/8Zglw/y9qZu2Ygb/TKAJQoNIS\n8Eufor07Lt+55H8DXhC9Fj6ckj9S2DQ6sVLRlC/nDsl4zU/mb8QVGfmlAY1HxyKk\nHNmfZunvMVAxu6L1DVOZH/Edto4etgeOBbHrS6z3j5RFFbN2j8QMCfxKadOpp7Dh\nEkhtP90VAgMBAAECggEAIPjNeXlvsojRIzygT1cxvezGvavz9g6PlI8jUbM2zAhF\n/3LdAmIjG18kSy2wC+PL04sQhUHBmM0I/66TUgXtjHm0aLgTfw/Sc4ycBs3599u2\nWXNPAWlN3f4SF137FIvKekMP3f9a1/XkFepYO9Mp8jkExCskyvo+Oe3F9t9C9ev4\nPBhmTMJcb6B/9Dw/scW0SeB+ukH0QIRo72M7w94GIEmh8rbN+PprAFX7kKmVSmBx\n5Qkbdvlr9OQTnSpHNgC7v3MM6VluWEvWB1BrRWY7OKTGiQpnrkINw8qplY23NceO\n3t3AGFRTM3m+6M9/QwWmb72/pTsMdS6Ln5/v+YBhWQKBgQDWdQ7bnxDVyPwptlJw\n87e3AXOiHXIFIqoyvZRNqX/V1nv4sP7AD3VPcYQodO2oLIHsQVEjWfI7rObGP/LO\ngWrCr6DkxAaxDM4sKvvQB2DrGaru80TTcsPMswZfpDg+k8Py+65FuZQn8/dD5/fR\nAswvJa7/WIe6KvBqTmMtxnMCjQKBgQC+JwH+BwZx1/GDW2MyiK44qOIzE8mw30ZJ\nIZAJlaYpZ9OgWUqCEmc+TAASrgHKGXnpHZrPfSBfWMU207jMUdBabz9kq6RTLe71\nl8ERfFQ+sGKoL7ZVW8P7B3AtgvYbuv9akrd2Mdm5W81zEpID5uqV6o48h2VMElcS\nODPGfUtmqQKBgG03cDmo6In3sXQMxi9/7y/kLV+CX27+GG9+3OgwSko80SX1/ccS\nGEw9I3D3G5FqGUCYgxnd1N9PTrfoGV/RyO0dRHM84auJOfaEbXmkSFdy2vqWKZcF\n+3FkOvq6R2qXFlPImRgpSqqONH8Aw9RN+G6KYnToQTcuZwG8qgXF6wyBAoGBAJjC\n6bzUk/7dhu8KehTc7WojcyWpnfz0Qpj516d7i/Pzr3ZAhbUdZ8gKcnyPQmzELsZy\nvC44zcsLm9RCH1I13/bnLLyJkAgq/LBc7ARKJ7v9JCUNv6OvhzCidyJ49ZKtlfuD\nptPTlKBu+gyaPKfZ2Vf7Ca3i8CQ/D6hZcm7htbORAoGACQU0rBi1sDPnrip/qMjF\n63R7FMNd8+idWgu6iiCCJnjdCn6fkRUPS+JopmFRISmNBIIF5ig6Nub8jFVddD/F\ntlzdeMMX9InyCk5FG6eDgtykkVRPtE5KC+nMnQ6GoXWXfSdgMgoWrRNqcH/Q5Kai\n3YnUC8onlLQpZy8hwmI8iVY=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ogpoi@uploadphotos-4ccff.iam.gserviceaccount.com",
    "client_id": "100832551863879440065",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ogpoi%40uploadphotos-4ccff.iam.gserviceaccount.com"
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const blogRef = admin.firestore().collection("blogref");
const storage = new Storage({
    keyFilename: "./credfb.json",
});
let blogs = [];
router.get("/", (req, res) => {
    res.status(200).json(blogs);
});
router.post("/addPost", (req, res) => {
    let newblog1 = {
        id: (0, uuid_1.v4)().toString(),
        postContent: req.body.postContent,
        tags: req.body.tags,
        author: req.body.author,
        catagory: req.body.catagory,
        photoUrl: "",
        date: req.body.date
    };
    blogs.push(newblog1);
    res.send("blog added");
});
router.post("/addPost1", (req, res) => {
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
                date: fields.date
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
            const bucket = storage.bucket("gs://uploadphotos-4ccff.appspot.com");
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
                        encodeURIComponent(imageResponse[0].name) + new Date().toString() +
                        "?alt=media&token=" + newblog1.id;
            }
            let newblog = {
                photoUrl: profileImage.size == 0 ? "" : imageUrl
            };
            newblog1.photoUrl = newblog.photoUrl;
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
});
function uploadOnfireStore(blogRef, docID, newblog, res, newblog1) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("in uploadimage function");
        console.log(newblog1);
        yield blogRef
            .doc(docID)
            .set(newblog, { merge: true })
            .then((value) => {
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
