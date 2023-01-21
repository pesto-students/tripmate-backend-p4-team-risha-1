"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const tour_1 = __importDefault(require("./routes/tour"));
const notes_1 = __importDefault(require("./routes/notes"));
const favTour_1 = __importDefault(require("./routes/favTour"));
const cms_1 = __importDefault(require("./routes/cms"));
const explore_1 = __importDefault(require("./routes/explore"));
const testimonial_1 = __importDefault(require("./routes/testimonial"));
const dotenv = __importStar(require("dotenv"));
const errorMiddleware_js_1 = require("./middleware/errorMiddleware.js");
const cors_1 = __importDefault(require("cors"));
const blog_1 = __importDefault(require("./routes/blog"));
const db_1 = __importDefault(require("./config/db"));
dotenv.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
// app.use("auth");
app.use((0, cors_1.default)());
//
app.use("/users", users_1.default);
app.use("/tours", tour_1.default);
app.use("/blog", blog_1.default);
app.use("/notes", notes_1.default);
app.use("/favTour", favTour_1.default);
app.use("/cms", cms_1.default);
app.use("/explore", explore_1.default);
app.use("/testimonial", testimonial_1.default);
app.use(errorMiddleware_js_1.notFound);
app.use(errorMiddleware_js_1.errorHandler);
app.use("/tours", tour_1.default);
app.use("/blog", blog_1.default);
app.get("/", (req, res) => {
    res.send("hello world");
});
app.listen(PORT, () => {
    console.log(`Hola Server is running on port ${PORT}`);
});
