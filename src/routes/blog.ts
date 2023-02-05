import express, { Router, Request, Response } from "express";
import { getblogs, createblog, deleteblogs,update_blog } from "../controllers/blog";
const router: Router = express.Router();

router.get("/", getblogs);
router.post("/", createblog);
router.put("/", deleteblogs);
router.put("/update", update_blog);


export default router;
