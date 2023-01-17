import { Schema, model } from "mongoose";
const tourSchema = new Schema(
    {  
    user_id: {
            type: String,
            required: true,
        },
        tourDetails: {
            type: String,
            required: true,
        },
        tourName:{
            type: String,
            required: true,
        },
        rating: {
            type: String,
            required: true,
        },
        feature: {
            type: String,
            required: true,
        },
        catagory:{
            type: String,
            required: true,
        },
        startdt: {
            type: String,
            required: true,
        },
        enddt: {
            type: String,
            required: true,
        }
    }
);

const Tour = model("Tour", tourSchema);

export default Tour;
