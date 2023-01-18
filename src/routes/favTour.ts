import express, { Router, Request, Response } from "express";
import { getfavtour, createfavTour ,deletefavtour} from "../controllers/favTour";

const router: Router = express.Router();

router.get("/", getfavtour);

router.post("/", createfavTour);
router.put("/", deletefavtour);

export default router;