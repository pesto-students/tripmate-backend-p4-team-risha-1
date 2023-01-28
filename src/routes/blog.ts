import express, { Router, Request, Response } from "express";
import { getblogs, createblog, deleteblogs } from "../controllers/blog";
const router: Router = express.Router();

router.get("/", getblogs);
router.post("/", createblog);
router.delete("/", deleteblogs);

export default router;
