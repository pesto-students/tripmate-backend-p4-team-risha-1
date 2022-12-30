"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
let blogs = [];
router.get("/", (req, res) => {
    res.status(200).json(blogs);
});
router.post("/addPost", (req, res) => {
    let newblog = {
        id: (0, uuid_1.v4)().toString(),
        postContent: req.body.postContent,
        tags: req.body.tags,
        author: req.body.author,
        catagory: req.body.catagory,
        date: req.body.date
    };
    blogs.push(newblog);
    res.send("blog added");
});
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
