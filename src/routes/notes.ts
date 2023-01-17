import express, { Router, Request, Response } from "express";
import { getnotesdetails, setnotesdetails ,deletenotes} from "../controllers/note";

const router: Router = express.Router();

router.get("/", getnotesdetails);

router.post("/", setnotesdetails);
router.put("/", deletenotes);

export default router;