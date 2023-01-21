import express, { Router, Request, Response } from "express";
import { getCMSdetails, setcmsdetails ,deletecms, updatecms} from "../controllers/cms";

const router: Router = express.Router();

router.get("/", getCMSdetails);

router.post("/", setcmsdetails);
router.put("/", deletecms);
router.put("/update", updatecms);


export default router;