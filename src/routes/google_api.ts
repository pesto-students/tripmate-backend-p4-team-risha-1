import express, { Router, Request, Response } from "express";
import { fetchPlaces} from "../controllers/google_api";
const router: Router = express.Router();
router.post("/",fetchPlaces);

export default router;

