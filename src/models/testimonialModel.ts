import { Schema, model } from "mongoose";
const testimonialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const TESTIMONIAL = model("TESTIMONIAL", testimonialSchema);

export default TESTIMONIAL;
