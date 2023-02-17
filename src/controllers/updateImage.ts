import express, { Router, Request, Response } from "express";
import formidable from "formidable-serverless";
const expressfb = require("express");
const router: Router = express.Router();


const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const formidable = require("formidable-serverless");
const ObjectId = require("mongodb").ObjectID;
import { updateImageinBlog } from "../controllers/blog";
import { updateImageinExplore } from "../controllers/explore";

export const updateImage =(req:Request, res: Response) =>{
    const form = new formidable.IncomingForm({ multiples: true });
    try{
        form.parse(req, async (err: any, fields: any, files: any) => {
            const profileImage = files.profileImage;
            let _id =  fields._id;
            let content = fields.content;
            let photoName = fields.photoName;

            switch(content){
               case "Blog" : return res.send(updateImageinBlog(profileImage,_id,photoName));
                                break;
                case "Explore" : return res.send(updateImageinExplore(profileImage,_id,photoName));
                                break; 
                 default:   return;                                     
            }
            
        });
    } catch(err){
        res.send({
            message: "Something went wrong",
            data: {},
            error: err,
          });
    }
}

export default router;