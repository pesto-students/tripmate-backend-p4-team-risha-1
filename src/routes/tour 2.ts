import express, { Router, Request, Response } from "express";
import { gettourdetails, setTourdetails } from "../controllers/tour";

const router: Router = express.Router();

router.get("/", gettourdetails);

router.post("/", setTourdetails);

export default router;