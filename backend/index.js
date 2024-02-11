// Importing required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRoutes = require("./Routes/studentRoutes");
const requestRoutes = require("./Routes/requestRoutes");
const staffRoutes = require("./Routes/staffRoutes");
const feedbackRoutes = require("./Routes/feedbackRoutes");

// Creating an instance of express application
var app = express();

app.set("view engine", "ejs");
app.use(cors());
// Using body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
// Mounting the employee routes at /api endpoint
app.use("/api", studentRoutes);
app.use("/api", requestRoutes);
app.use("/api", staffRoutes);
app.use("/api", feedbackRoutes);

// Starting the server and listening on port 3005
var server = app.listen(3005, function (req, res) {
  // Logging the URL where the application is running
  console.log("View here: http://localhost:3005/api/");
});
