import { v4 as uuidv4 } from "uuid";
import { Application, Request, Response } from "express";

interface Tour {
    id: string;
    user_id:any;
    tourName: string;
    tourDetails: string;
    rating: any;
    feature: string;
    category: string; 
    startdt: string;
    enddt:string;   
  }
  
  let tours: any = [];
  export const gettourdetails = (req: Request, res: Response) => {
    res.status(200).json(tours);
  };

  export const setTourdetails = (req: Request, res: Response) => {
    let newTour: Tour = {
      id: uuidv4().toString(),
      user_id:req.body.user_id,
      tourName: req.body.tourName,
      tourDetails: req.body.tourDetails,
      rating: req.body.rating,
      feature: req.body.feature,
      category: req.body.category,
      startdt: req.body.startdt,
      enddt:req.body.enddt
    };
    tours.push(newTour);
    res.send("new user created");
  };