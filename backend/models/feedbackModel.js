const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HousekeepingDb");

const feedbackSchema = new mongoose.Schema({
  reqid: {
    type: String,
    required: true,
  },
  hname: {
    type: String,
    required: true,
  },
  hid: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  stdid: {
    type: String,
    required: true,
  },
});

const FeedbackModel = mongoose.model("Feedbacks", feedbackSchema, "Feedbacks");

module.exports = FeedbackModel;
