import { v4 as uuidv4 } from "uuid";
import { Application, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";

interface Users {
  username: string;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

let users: any = [];

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
