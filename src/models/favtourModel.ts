import { Schema, model } from "mongoose";
const favTourSchema = new Schema(
    {  
    user_id: {
            type: String,
            required: true,
        },
        tour_id: {
            type: String,
            required: true,
        }
    }
);

const FavTour = model("FavTour", favTourSchema);

export default FavTour;