import express, { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getUsers,
  createUser,
  authUser,
  getUserProfile,
} from "../controllers/users";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";

const router: Router = express.Router();

let password: (x: string) => string = function (x) {
  return x;
};

let users: any = [];

router.route("/login").post(authUser);
router.route("/profile").post(protect, getUserProfile);

router.get("/", asyncHandler(getUsers));

router.post("/", asyncHandler(createUser));

router.patch("/:id", (req: Request, res: Response) => {
  res.send(users.filter((user: any) => user.id === req.params.id));
});

export default router;
