// Import required modules
const express = require("express");
const router = express.Router();
const ReqModel = require("../models/requestModel");
const { body, validationResult } = require("express-validator"); // Import express-validator for input validation
router.use(express.json());

// Define routes and middleware
router.get("/requests", async function (req, res) {
  try {
    let result = await ReqModel.find({}, { _id: 0 }).sort({ reqid: 1 }).lean();
    res.send(result);
    // console.table(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/requests/:id", async function (req, res) {
  var id = req.params.id;
  try {
    let result = await ReqModel.findOne({ stdid: id }, { _id: 0 })
      .sort({ reqid: 1 })
      .lean();
    res.send(result);
    // console.table(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/requests/admin/:id", async function (req, res) {
  var id = req.params.id;
  try {
    let result = await ReqModel.findOne({ reqid: id }, { _id: 0 })
      .sort({ reqid: 1 })
      .lean();
    res.send(result);
    // console.table(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(
  "/requests",
  [
    // Validation for input fields using express-validator
    body("date").notEmpty().withMessage("Date is required"),
    body("timings").notEmpty().withMessage("Timings are required"),
    body("reqs").notEmpty().withMessage("Reqs are required"),
    body("status").notEmpty().withMessage("Status is required"),
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
    }
    try {
      // Create a new request object
      const newReq = new ReqModel({
        reqid: req.body.reqid,
        date: req.body.date,
        timings: req.body.timings,
        reqs: req.body.reqs,
        status: req.body.status,
        stdid: req.body.stdid,
      });
      console.log(newReq);
      // Save the new request to the database
      await newReq.save();

      res.status(201).json({ message: "Request created successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
);

router.put(
  "/modify/request",
  [
    // Validation for input fields using express-validator
    body("reqid").notEmpty().withMessage("Request ID is required"),
    body("date").notEmpty().withMessage("Date is required"),
    body("timings").notEmpty().withMessage("Timings are required"),
    body("reqs").notEmpty().withMessage("Reqs are required"),
    body("status").notEmpty().withMessage("Status is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
    }

    try {
      let id = req.body.reqid;
      let request = await ReqModel.findOne({ reqid: id });
      if (!request) {
        return res.status(404).send("The request does not exist");
      } else {
        request.date = req.body.date;
        request.timings = req.body.timings;
        request.reqs = req.body.reqs;
        request.hid = req.body.hid;
        request.stdid = req.body.stdid;
        request.status = req.body.status;
        const UpdatedRequest = await request.save();
        res
          .status(200)
          .json({ message: "Request Updated", data: UpdatedRequest });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
);
router.put("/requests/admin/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    let request = await ReqModel.findOne({ reqid: id });
    if (!request) {
      return res.status(404).send("The request does not exist");
    } else {
      request.status = req.body.status;
      request.hid = req.body.hid;
      const UpdatedRequest = await request.save();
      res
        .status(200)
        .json({ message: "Request Updated", data: UpdatedRequest });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

module.exports = router;
