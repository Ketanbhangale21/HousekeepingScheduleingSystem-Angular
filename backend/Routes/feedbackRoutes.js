// feedbackRoutes.js
const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedbackModel");

// Create feedback
router.post("/feedbacks", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).send(feedback);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all feedback
router.get("/feedbacks", async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.send(feedback);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
