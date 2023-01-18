import { v4 as uuidv4 } from "uuid";
import { Application, Request, Response } from "express";
import CMS from "../models/cmsModel";
const ObjectId  = require('mongodb').ObjectID;


  export const getCMSdetails = async(req: Request, res: Response) => {
    const cms = await CMS.find({});
    res.status(200).json(cms);
  };

  export const setcmsdetails = (req: Request, res: Response) => {
    let newcms = new CMS({
        front_page_detail:req.body.front_page_detail,
        popular: req.body.popular,
        about_us: req.body.about_us
    }
    );
    newcms.save(function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("CMS added  created" + result);
      }
    });
  };

  export const deletecms =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  const cms = await CMS.find({"_id": ObjectId(id)});
  try{
    if(cms!=null){
      res.status(200).json(await CMS.deleteOne({_id: req.body._id})); 
    }
  }catch(err){
    res.status(200).json( req.body._id+" is not found")
  }
};