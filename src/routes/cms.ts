import express, { Router, Request, Response } from "express";
import { getCMSdetails, setcmsdetails ,deletecms} from "../controllers/cms";

const router: Router = express.Router();

router.get("/", getCMSdetails);

router.post("/", setcmsdetails);
router.put("/", deletecms);

export default router;