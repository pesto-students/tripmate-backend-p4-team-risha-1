import { v4 as uuidv4 } from "uuid";
import { Application, Request, Response } from "express";
import bcrypt from "bcrypt";

interface Users {
  id: string;
  username: string;
  email: string;
  password: any;
  name: string;
}

let users: any = [];
export const getUsers = (req: Request, res: Response) => {
  res.status(200).json(users);
};

export const createUser = (req: Request, res: Response) => {
  const saltRound = 10;
  const password: string = req.body.password;
  let encryptedPassword: string;
  //bcrypt.genSalt(saltRound).then(())
  let newUser: Users = {
    id: uuidv4().toString(),
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hash(req.body.password, 10, (err, hash) => hash),
    name: req.body.name,
  };
  users.push(newUser);
  res.send("Congratulation.....🎉✨new user created");
};
