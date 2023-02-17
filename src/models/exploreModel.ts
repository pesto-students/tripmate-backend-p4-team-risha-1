import { Schema, model } from "mongoose";
const exploreSchema = new Schema(
    {  
    title: {
            type: String,
            required: true,
        },
    image_url: {
            type: String,
            required: true,
        },
    context :{
            type: String,
            required: true,
        },
        photoName:{
            type: String,
            required: true,
        }
    }
);

const Explore = model("Explore", exploreSchema);

export default Explore;