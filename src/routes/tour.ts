import express, { Router, Request, Response } from "express";
import { gettourdetails, setTourdetails, deletetour , updateTour} from "../controllers/tour";

const router: Router = express.Router();

router.get("/", gettourdetails);

router.post("/", setTourdetails);
 router.put("/", deletetour);
 router.put("/update", updateTour);

export default router;