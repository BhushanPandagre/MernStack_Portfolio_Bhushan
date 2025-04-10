import express from "express";
import {
  deleteTimeline,
  getAllTimelines,
  postTimeline,
  // updateTimeline, // Uncomment when needed
} from "../controller/timelineController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Add a new timeline
router.post("/add", isAuthenticated, postTimeline);

// Delete a timeline by ID
router.delete("/delete/:id", isAuthenticated, deleteTimeline);

// Get all timelines
router.get("/getall", getAllTimelines);

export default router;
