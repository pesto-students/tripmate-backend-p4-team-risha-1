import express, { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const router: Router = express.Router();

let password: (x: string) => string = function (x) {
  return x;
};

interface Users {
  id: string;
  username: string;
  email: string;
  password: any;
  name: string;
}

let users: any = [];

router.get("/", (req: Request, res: Response) => {
  res.status(200).json(users);
});

router.post("/", (req: Request, res: Response) => {
  let newUser: Users = {
    id: uuidv4().toString(),
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hash(req.body.password, 10, (err, hash) => hash),
    name: req.body.name,
  };
  users.push(newUser);
});

export default router;
