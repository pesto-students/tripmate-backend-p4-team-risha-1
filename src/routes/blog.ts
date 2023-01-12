import express, { Router, Request, Response } from "express";
import { getblogs, createblog } from "../controllers/blog";

const router: Router = express.Router();

router.get("/", getblogs);

router.post("/", createblog);

export default router;