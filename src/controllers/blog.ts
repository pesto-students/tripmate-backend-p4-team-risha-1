import express, { Router, Request, Response } from "express";
import { LeanType } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const UUID = require("uuid-v4");
const expressfb = require("express");
const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const formidable = require("formidable-serverless");
import credentials from "../credentials";
require("dotenv").config();

const router: Router = express.Router();
//const credentials = require("../../credfb.json");

const app = expressfb();
app.use(expressfb.json({ limit: "50mb", extended: true }));
app.use(expressfb.urlencoded({ extended: false, limit: "50mb" }));

var admin = require("firebase-admin");

const photoUrl =
  "https://firebasestorage.googleapis.com/v0/b/uploadphotos-4ccff.appspot.com/o/";

var serviceAccount = credentials;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const blogRef = admin.firestore().collection("blogref");

const storage = new Storage({
  keyFilename: "./credfb.json",
  //keyFilename: "../credentials",
});
const bucket = storage.bucket("gs://uploadphotos-4ccff.appspot.com");

interface Blog {
  id: string;
  postContent: string;
  tags: string;
  author: any;
  catagory: String;
  photoUrl: String;
  date: string;
}

interface Blog1 {
  photoUrl: any;
}

let blogs: any = [];

export const getblogs = (req: Request, res: Response) => {
  res.status(200).json(blogs);
};

router.post("/addPost", (req: Request, res: Response) => {
  let newblog1: Blog = {
    id: uuidv4().toString(),
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

export const createblog = (req: Request, res: Response) => {
  console.log("in post1");
  const form = new formidable.IncomingForm({ multiples: true });
  try {
    form.parse(req, async (err: any, fields: any, files: any) => {
      let uuid = UUID();
      let downLoadPath = "";
      const profileImage = files.profileImage;
      let newblog1: Blog = {
        id: uuidv4().toString(),
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
      } else {
        const imageResponse = await bucket.upload(profileImage.path, {
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
      let newblog: Blog1 = {
        photoUrl: profileImage.size == 0 ? "" : imageUrl,
      };
      newblog1.photoUrl = photoUrl + newblog.photoUrl;
      uploadOnfireStore(blogRef, docID, newblog, res, newblog1);
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
  newblog1: Blog
) {
  console.log("in uploadimage function");

  await blogRef
    .doc(docID)
    .set(newblog, { merge: true })
    .then((value: any) => {
      blogs.push(newblog1);
      // return response to users
      res.status(200).send({
        message: "user created successfully",
        data: newblog1,
        error: {},
      });
    });
}

router.put("/deletePost", (req: Request, res: Response) => {
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

export default router;
