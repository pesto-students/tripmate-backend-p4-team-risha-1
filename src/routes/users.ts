import express, { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { getUsers, createUser } from "../controllers/users";

const router: Router = express.Router();

let password: (x: string) => string = function (x) {
  return x;
};

let users: any = [];

router.get("/", getUsers);

router.post("/", createUser);

router.patch("/:id", (req: Request, res: Response) => {
  res.send(users.filter((user: any) => user.id === req.params.id));
});

export default router;
