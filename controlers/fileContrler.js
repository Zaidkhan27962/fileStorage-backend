import fileUpload from "../models/fileModel.js";
import fs from "fs";
import path from "path";


// POST /api/upload
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Only allow video files (extra safety)
    const allowedTypes = [
      "video/mp4",
      "video/webm",
      
      "video/ogg",
      "video/avi",
      "video/mov",
      "video/mkv",
    ];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: "Only video files are allowed" });
    }

    const video = new fileUpload({
      originalname: req.file.originalname,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    });

    await video.save();

    res.status(201).json({ message: "File uploaded successfully", file: video });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/files
export const getAllVideos = async (req, res) => {
  try {
    const videos = await fileUpload.find().sort({ uploadedAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const deleteVideo = async (req, res) => {
  try {
    const video = await fileUpload.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "File not found" });
    }

    // Remove file from filesystem
    const filePath = path.resolve("uploads", video.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        // File may not exist, but still remove from DB
        console.warn("File not found on disk:", filePath);
      }
    });

    await video.deleteOne();

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};