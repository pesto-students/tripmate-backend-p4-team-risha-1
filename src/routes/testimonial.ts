import express, { Router, Request, Response } from "express";
import { gettesTestimonial, setsetTestimonial ,deleteTestimonial, updateTestimonial} from "../controllers/testimonial";

const router: Router = express.Router();

router.get("/", gettesTestimonial);

router.post("/", setsetTestimonial);
router.put("/", deleteTestimonial);
router.put("/update", updateTestimonial);
export default router;