import { Application, Request, Response } from "express";
import TESTIMONIAL from "../models/testimonialModel";
const ObjectId  = require('mongodb').ObjectID;


  export const gettesTestimonial = async(req: Request, res: Response) => {
    const testimonial = await TESTIMONIAL.find({});
    res.status(200).json(testimonial);
  };

  export const setsetTestimonial = (req: Request, res: Response) => {
    let newNotes = new TESTIMONIAL({
        userName:req.body.userName,
        content: req.body.content
    }
    );
    newNotes.save(function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("Testimonial  created" + result);
      }
    });
  };

  export const deleteTestimonial =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  const testimonial = await TESTIMONIAL.find({"_id": ObjectId(id)});
  try{
    if(testimonial!=null){
      res.status(200).json(await TESTIMONIAL.deleteOne({_id: req.body._id})); 
    }
  }catch(err){
    res.status(200).json( req.body._id+" is not found")
  }
};

export const updateTestimonial =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  try{
    await TESTIMONIAL.findByIdAndUpdate(id,req.body);
    res.send(req.body);
  }catch(err){
    res.send(err); 
  }
 
};
