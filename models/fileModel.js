import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    originalname: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
      enum: ["video/mp4", "video/webm", "video/ogg", "video/avi", "video/mov", "video/mkv"], // allow only video types
    },
    size: {
      type: Number,
      
    },
    path: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "videos" }
);

const fileUpload= mongoose.model("VideoFile", fileSchema);
export default fileUpload;