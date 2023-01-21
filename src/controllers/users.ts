import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import { Application, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

interface Users {
  username: string;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  token: string;
}

export const getUsers = async (req: Request, res: Response) => {
  //res.status(200).json(users);
  const users = await User.find({});
  res.status(200).json(users);
};

export const authUser = async function (req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    res.send("User not found");
    return;
  }
  const verify = await bcrypt.compare(password, user.password);
  if (verify) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(403);
    res.send("Invalid email or password");
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password, username, name } = req.body;
  const userExist = await User.findOne({ email });

  const saltRound = 10;
  //const password: string = req.body.password;
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    username,
    password: bcrypt.hashSync(password, 10),
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400);
    throw new Error("invalid data");
  }

  // let newUser = new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: bcrypt.hashSync(password, 10),
  //   name: req.body.name,
  //   isAdmin: false,
  // });

  // newUser.save(function (err, result) {
  //   if (err) {
  //     console.log(err);
  //     res.send(err);
  //   } else {
  //     res.send("user created" + result);
  //   }
  // });
};
