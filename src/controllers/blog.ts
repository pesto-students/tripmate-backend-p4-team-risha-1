import express, { Router, Request, Response } from "express";
import { LeanType } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const UUID = require("uuid-v4");
const expressfb = require("express");
const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const formidable = require("formidable-serverless");
const ObjectId  = require('mongodb').ObjectID;

import credentials from "../credentials";
require("dotenv").config();
import Blog from "../models/blogModel";

const router: Router = express.Router();
//const credentials = require("../../credfb.json");

const app = expressfb();
app.use(expressfb.json({ limit: "50mb", extended: true }));
app.use(expressfb.urlencoded({ extended: false, limit: "50mb" }));

var admin = require("firebase-admin");

const photoUrl =
  "https://firebasestorage.googleapis.com/v0/b/uploadphotos-4ccff.appspot.com/o/";

var serviceAccount ={
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
  credential: admin.credential.cert(serviceAccount),
});

const blogRef = admin.firestore().collection("blogref");

const storage = new Storage({
  keyFilename: "./credfb.json",
  //keyFilename: "../credentials",
});
const bucket = storage.bucket("gs://uploadphotos-4ccff.appspot.com");

interface Blog1 {
  photoUrl: any;
}

//let blogs: any = [];

export const getblogs =async (req: Request, res: Response) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
};


export const createblog = (req: Request, res: Response) => {
  const form = new formidable.IncomingForm({ multiples: true });
  try {
    form.parse(req, async (err: any, fields: any, files: any) => {
      let uuid = UUID();
      let downLoadPath = "";
      const profileImage = files.profileImage;
      let blog = new Blog  ({
        photoUrl: "",
        photoName:"",
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

export const deleteblogs =async (req: Request, res: Response) => {
  console.log("delet blogs");
  const id   = req.body._id; 
  const blog = await Blog.find({"_id": ObjectId(id)});
  try{
    if(blog!=null){
      console.log(blog);
      try{
        const file = bucket.file("blogs/"+ blog[0].photoName );
        file.delete();
      }catch(err){
        res.status(200).json(blog[0].photoName+"photo not found");
      }    
      res.status(200).json(await Blog.deleteOne({_id: req.body._id})); 
    }
  }catch(err){
    res.status(200).json( req.body._id+" is not found")
  }
  
 
};
export default router;
