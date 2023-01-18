import express, { Router, Request, Response } from "express";
import { getexploredetails, setexploredetails ,delete_explore} from "../controllers/explore";

const router: Router = express.Router();

router.get("/", getexploredetails);

router.post("/", setexploredetails);
router.put("/", delete_explore);

export default router;