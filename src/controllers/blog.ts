import express, { Router, Request, Response } from "express";
import formidable from "formidable-serverless";
const expressfb = require("express");

const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const formidable = require("formidable-serverless");
const ObjectId = require("mongodb").ObjectID;

import credentials from "../credentials";
require("dotenv").config();

import { bucket, blogRef } from "../credentials";

import Blog from "../models/blogModel";

const router: Router = express.Router();

const app = expressfb();
app.use(expressfb.json({ limit: "50mb", extended: true }));
app.use(expressfb.urlencoded({ extended: false, limit: "50mb" }));

var admin = require("firebase-admin");

const photoUrl =
  "https://firebasestorage.googleapis.com/v0/b/uploadphotos-4ccff.appspot.com/o/";

var serviceAccount = credentials;

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
//storage.bucket("gs://uploadphotos-4ccff.appspot.com");

interface Blog1 {
  photoUrl: any;
}

export const getblogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
};
// @desc Add New Post
// @Route /blog

export const createblog = (req: Request, res: Response) => {
  const form = new formidable.IncomingForm({ multiples: true });
  try {
    form.parse(req, async (err: any, fields: any, files: any) => {
      let downLoadPath = "";
      const profileImage = files.profileImage;
      let blog = new Blog({
        photoUrl: "",
        photoName: "",
        postTitle: fields.postTitle,
        postContent: fields.postContent,
        tags: fields.tags,
        author: fields.author,
        category: fields.category,
      });
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
      } else {
        const imageResponse = await bucket.upload(profileImage.path, {
          destination: `blogs/${profileImage.name}`,
          resumable: true,
          metadata: {
            metadata: {
              firebaseStorageDownloadTokens: blog.id,
            },
          },
        });
        // profile image url
        imageUrl =
          downLoadPath +
          encodeURIComponent(imageResponse[0].name) +
          "?alt=media&token=" +
          blog.id;
      }
      let newblog: Blog1 = {
        photoUrl: profileImage.size == 0 ? "" : imageUrl,
      };
      blog.photoUrl = photoUrl + newblog.photoUrl;
      blog.photoName = profileImage.name;
      uploadOnfireStore(blogRef, docID, newblog, res, blog);
    });
  } catch (err) {
    res.send({
      message: "Something went wrong",
      data: {},
      error: err,
    });
  }
};

async function uploadOnfireStore(
  blogRef: any,
  docID: any,
  newblog: Blog1,
  res: Response,
  blog: any
) {
  await blogRef
    .doc(docID)
    .set(newblog, { merge: true })
    .then((value: any) => {
      blog.save();
      res.status(200).send({
        message: "blog created successfully",
        data: blog,
        error: {},
      });
    });
}

export const deleteblogs = async (req: Request, res: Response) => {
  console.log("delete blogs");
  const id = req.body._id;
  const blog = await Blog.find({ _id: ObjectId(id) });
  try {
    if (blog != null) {
      console.log(blog);
      try {
        const file = bucket.file("blogs/" + blog[0].photoName);
        file.delete();
      } catch (err) {
        res.status(200).json(blog[0].photoName + "photo not found");
      }
      res.status(200).json(await Blog.deleteOne({ _id: req.body._id }));
    }
  } catch (err) {
    res.status(200).json(req.body._id + " is not found");
  }
};

export const updateImage = (req: Request, res: Response) => {
  const form = new formidable.IncomingForm({ multiples: true });
  try {
    form.parse(req, async (err: any, fields: any, files: any) => {
      let downLoadPath = "";
      const profileImage = files.profileImage;
      let blog = new Blog({
        photoUrl: "",
        photoName: "",
        postContent: fields.postContent,
        tags: fields.tags,
        author: fields.author,
        catagory: fields.catagory,
        date: fields.date,
      });
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
      } else {
        const imageResponse = await bucket.upload(profileImage.path, {
          destination: `blogs/${profileImage.name}`,
          resumable: true,
          metadata: {
            metadata: {
              firebaseStorageDownloadTokens: blog.id,
            },
          },
        });
        // profile image url
        imageUrl =
          downLoadPath +
          encodeURIComponent(imageResponse[0].name) +
          "?alt=media&token=" +
          blog.id;
      }
      let newblog: Blog1 = {
        photoUrl: profileImage.size == 0 ? "" : imageUrl,
      };
      blog.photoUrl = photoUrl + newblog.photoUrl;
      blog.photoName = profileImage.name;
      uploadOnfireStore(blogRef, docID, newblog, res, blog);
    });
  } catch (err) {
    res.send({
      message: "Something went wrong",
      data: {},
      error: err,
    });
  }
};

export default router;
