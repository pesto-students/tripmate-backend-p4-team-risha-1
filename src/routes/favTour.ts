import express, { Router, Request, Response } from "express";
import { getfavTourdetails, setfavTourdetails ,deletefavTour, updatefavTour} from "../controllers/favTour";

const router: Router = express.Router();

router.get("/", getfavTourdetails);

router.post("/", setfavTourdetails);
router.put("/", deletefavTour);
router.put("/update", updatefavTour);

export default router;