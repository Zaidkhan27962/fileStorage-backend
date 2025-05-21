import express from "express";
import multer from "multer";
import { uploadFile, getAllVideos,deleteVideo } from "../controlers/fileContrler.js";

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST /api/upload - Upload a video file
router.post("/upload", upload.single("video"), uploadFile);

// GET /api/getAllFiles - Get all uploaded videos
router.get("/getAllFiles", getAllVideos);
// DELETE /api/delete/:id - Delete a video file
 router.delete("/delete/:id", deleteVideo);


export default router;