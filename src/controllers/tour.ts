import { v4 as uuidv4 } from "uuid";
import { Application, Request, Response } from "express";
import Tour from "../models/tourModel";
const ObjectId  = require('mongodb').ObjectID;


  export const gettourdetails = async(req: Request, res: Response) => {
    const tour = await Tour.find({});
    res.status(200).json(tour);
  };

  export const setTourdetails = (req: Request, res: Response) => {
    let newTour = new Tour({
      user_id:req.body.user_id,
      tourName: req.body.tourName,
      tourDetails: req.body.tourDetails,
      rating: req.body.rating,
      feature: req.body.feature,
      category: req.body.category,
      startdt: req.body.startdt,
      enddt:req.body.enddt}
    );
    newTour.save(function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("Tour added  created" + result);
      }
    });
  };

  export const deletetour =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  const tour = await Tour.find({"_id": ObjectId(id)});
  try{
    if(tour!=null){
      res.status(200).json(await Tour.deleteOne({_id: req.body._id})); 
    }
  }catch(err){
    res.status(200).json( req.body._id+" is not found")
  }
};


export const updateTour =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  try{
    await Tour.findByIdAndUpdate(id,req.body);
    res.send(req.body);
  }catch(err){
    res.send(err); 
  }
 
};