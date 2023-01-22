import { Schema, model } from "mongoose";
const blogSchema = new Schema(
  {
    photoUrl: {
      type: String,
      required: true,
    },
    photoName: {
      type: String,
      required: true,
    },
    postTitle: {
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
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

export default Blog;
