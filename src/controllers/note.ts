import { v4 as uuidv4 } from "uuid";
import { Application, Request, Response } from "express";
import Notes from "../models/notesModel";
const ObjectId  = require('mongodb').ObjectID;


  export const getnotesdetails = async(req: Request, res: Response) => {
    const notes = await Notes.find({});
    res.status(200).json(notes);
  };

  export const setnotesdetails = (req: Request, res: Response) => {
    let newNotes = new Notes({
        tour_id:req.body.tour_id,
      notes: req.body.notes
    }
    );
    newNotes.save(function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("Notes added  created" + result);
      }
    });
  };

  export const deletenotes =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  const note = await Notes.find({"_id": ObjectId(id)});
  try{
    if(note!=null){
      res.status(200).json(await Notes.deleteOne({_id: req.body._id})); 
    }
  }catch(err){
    res.status(200).json( req.body._id+" is not found")
  }
};

export const updatenotes =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  try{
    await Notes.findByIdAndUpdate(id,req.body);
    res.send(req.body);
  }catch(err){
    res.send(err); 
  }
 
};
