"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    photoUrl: {
        type: String,
        required: true,
    },
    photoName: {
        type: String,
        required: true,
    },
    postContent: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    catagory: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;
