import { Application, Request, Response } from "express";
import FavTour from "../models/favtourModel";
const ObjectId  = require('mongodb').ObjectID;


  export const getfavTourdetails = async(req: Request, res: Response) => {
    const favTour = await FavTour.find({});
    res.status(200).json(favTour);
  };

  export const setfavTourdetails = (req: Request, res: Response) => {
    let favTour = new FavTour({
      user_id:req.body.user_id,
      tour_id: req.body.tour_id
    }
    );
    favTour.save(function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("favTour added added  created" + result);
      }
    });
  };

  export const deletefavTour =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  const favTour = await FavTour.find({"_id": ObjectId(id)});
  try{
    if(favTour!=null){
      res.status(200).json(await FavTour.deleteOne({_id: req.body._id})); 
    }
  }catch(err){
    res.status(200).json( req.body._id+" is not found")
  }
};

export const updatefavTour =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  try{
    await FavTour.findByIdAndUpdate(id,req.body);
    res.send(req.body);
  }catch(err){
    res.send(err); 
  }
 
};