import express, { Router, Request, Response } from "express";
import formidable from "formidable-serverless";
const expressfb = require("express");
const ObjectId  = require('mongodb').ObjectID;
import {bucket,blogRef,photoUrl} from "../credentials";
import Explore from "../models/exploreModel";

const router: Router = express.Router();

const app = expressfb();
app.use(expressfb.json({ limit: "50mb", extended: true }));
app.use(expressfb.urlencoded({ extended: false, limit: "50mb" }));

interface Blog1 {
  photoUrl: any;
}



export const getexploredetails =async (req: Request, res: Response) => {
  const explore = await Explore.find({});
  res.status(200).json(explore);
};


export const setexploredetails = (req: Request, res: Response) => {
  const form = new formidable.IncomingForm({ multiples: true });
  try {
    form.parse(req, async (err: any, fields: any, files: any) => {
      const profileImage = files.profileImage;
      let explore = new Explore  ({
        title: fields.title,
        image_url:"",
        context: fields.postContent,
        photoName :""
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
              firebaseStorageDownloadTokens: explore.id,
            },
          },
        });
        // profile image url
        imageUrl =
          encodeURIComponent(imageResponse[0].name) +
          "?alt=media&token=" +
          explore.id;
      }
      let newblog: Blog1 = {
        photoUrl: profileImage.size == 0 ? "" : imageUrl,
      };
      explore.image_url = photoUrl + newblog.photoUrl;
      explore.photoName = profileImage.name;
      uploadOnfireStore(blogRef, docID, newblog, res, explore);
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
  explore: any
) {
  await blogRef
    .doc(docID)
    .set(newblog, { merge: true })
    .then((value: any) => {
    explore.save();
      res.status(200).send({
        message: "blog created successfully",
        data: explore,
        error: {},
      });
    });
}

export const delete_explore =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  const explore = await Explore.find({"_id": ObjectId(id)});
  try{
    if(explore!=null){
      console.log(explore);
      try{
        const file = bucket.file("blogs/"+ explore[0].photoName );
        file.delete();
      }catch(err){
        res.status(200).json(explore[0].photoName+"photo not found");
      }    
      res.status(200).json(await Explore.deleteOne({_id: req.body._id})); 
    }
  }catch(err){
    res.status(200).json( req.body._id+" is not found")
  }
  
 
};
export default router;
