import { Application, Request, Response } from "express";
import FavTour from "../models/favtourModel";
const ObjectId  = require('mongodb').ObjectID;


  export const getfavTourdetails = async(req: Request, res: Response) => {
    const favTour = await FavTour.find({});
    res.status(200).json(favTour);
  };

  export const setfavTourdetails = (req: Request, res: Response) => {
    let favTour = new FavTour({
      user_id:req.body.tour_id,
      tour_id: req.body.notes
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

  export const favTournotes =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  const note = await FavTour.find({"_id": ObjectId(id)});
  try{
    if(note!=null){
      res.status(200).json(await FavTour.deleteOne({_id: req.body._id})); 
    }
  }catch(err){
    res.status(200).json( req.body._id+" is not found")
  }
};