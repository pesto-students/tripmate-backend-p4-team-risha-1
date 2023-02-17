import { Application, Request, Response } from "express";

const axios = require('axios');
const router = require('express').Router();

export const fetchPlaces = async(req: Request, res: Response) => {
    try {
        console.log("in fetch api");
        const location = req.body.location;//'16.6629739,74.2061816';
        const radius = req.body.radius;//'4000';
        const type = req.body.type;//'tourist_attraction';
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAMK3vI-Vqdf6l-EwT7xTw3UF-3npnKBGY&location='+location+
        '&radius='+ radius+'&type='+type
        )
      console.log(response)
        res.status(200).json(response.data)
        }
      catch (err) {
      console.log(err)
       res.send(err);
     }
  };
