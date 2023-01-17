import { Schema, model } from "mongoose";
const tourSchema = new Schema(
    {  
    tour_id: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: true,
        }
    }
);

const Notes = model("Notes", tourSchema);

export default Notes;