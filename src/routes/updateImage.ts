import express, { Router, Request, Response } from "express";
import { updateImage} from "../controllers/updateImage";

const router: Router = express.Router();

router.put("/", updateImage);
export default router;