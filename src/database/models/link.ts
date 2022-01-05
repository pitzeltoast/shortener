import mongoose from "mongoose";

const scheme = new mongoose.Schema({ short: String, url: String });

export default mongoose.model("link", scheme);
