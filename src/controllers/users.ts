import { v4 as uuidv4 } from "uuid";
import { Application, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
const ObjectId  = require('mongodb').ObjectID;


interface Users {
  username: string;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}


export const getUsers = async (req: Request, res: Response) => {
  //res.status(200).json(users);
  const users = await User.find({});
  res.status(200).json(users);
};

async function hashPassword(plain: string) {
  const hash: string = await bcrypt.hash(plain, 10);
  return hash;
}

export const createUser = async (req: Request, res: Response) => {
  const saltRound = 10;
  const password: string = req.body.password;
  console.log(password);
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(password, 10),
    name: req.body.name,
    isAdmin: false,
  });

  newUser.save(function (err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("user created" + result);
    }
  });
};

export const deleteuser =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  const cms = await User.find({"_id": ObjectId(id)});
  try{
    if(cms!=null){
      res.status(200).json(await User.deleteOne({_id: req.body._id})); 
    }
  }catch(err){
    res.status(200).json( req.body._id+" is not found")
  }
};

export const updatecms =async (req: Request, res: Response) => {
  const id   = req.body._id; 
  try{
    await User.findByIdAndUpdate(id,req.body);
    res.send(req.body);
  }catch(err){
    res.send(err); 
  }
 
};