import { Schema, model } from "mongoose";
const cmsSchema = new Schema(
    {  
    front_page_detail: {
            type: String,
            required: true,
        },
        popular: {
            type: String,
            required: true,
        },
        about_us: {
            type: String,
            required: true,
        }
    }
);

const CMS = model("CMS", cmsSchema);

export default CMS;