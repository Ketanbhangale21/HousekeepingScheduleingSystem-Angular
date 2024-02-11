const express = require("express");
const router = express.Router();
const { body, validationResult, param } = require("express-validator");
const StaffModel = require("../models/staffModel");

router.use(express.json());

router.get("/staff", async function (req, res) {
  try {
    let result = await StaffModel.find({}, { _id: 0 }).sort({ hid: 1 }).lean();
    res.send(result);
    // console.table(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/staff/:id", async function (req, res) {
  var id = req.params.id;
  try {
    const data = await StaffModel.findOne({ hid: id }, { _id: 0 }).lean();
    if (!data) return res.status(404).send(`No record with ${id}`);
    else {
      res.send(data);
      // console.table(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(
  "/staff",
  [
    body("hid").notEmpty().withMessage("Staff ID is required"),
    body("fname").notEmpty().withMessage("First name is required"),
    body("lname").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("country").notEmpty().withMessage("Country is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("phone").isNumeric().withMessage("Phone number must be numeric"),
    body("gender").notEmpty().withMessage("Gender is required"),
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newStaff = new StaffModel(req.body);
      console.log(newStaff);
      const createdStaff = await newStaff.save();
      res.status(201).json({
        message: "Staff created successfully",
        data: createdStaff,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
);

router.put(
  "/staff",
  [
    body("fname").notEmpty().withMessage("First Name is required"),
    body("lname").notEmpty().withMessage("Last Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("country").notEmpty().withMessage("Country is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("phone").isNumeric().withMessage("Phone number must be numeric"),
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let staffid = req.body.hid;
      // console.log(staffid);
      let staff = await StaffModel.findOne({ hid: staffid });
      // console.log(staff);
      if (!staff) {
        return res
          .status(404)
          .send("The staff you are trying to update does not exist.");
      } else {
        staff.fname = req.body.fname;
        staff.lname = req.body.lname;
        staff.email = req.body.email;
        staff.country = req.body.country;
        staff.state = req.body.state;
        staff.city = req.body.city;
        staff.phone = req.body.phone;
        staff.gender = req.body.gender;
        const updatedStaff = await staff.save();
        res.status(200).json({
          message: "Staff updated successfully",
          data: updatedStaff,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
);
router.put("/staff/allocate/:id", async function (req, res) {
  try {
    let id = req.params.id;

    let staff = await StaffModel.findOne({ hid: id });
    if (!staff) {
      return res
        .status(404)
        .send("The staff you are trying to update does not exist.");
    } else {
      staff.status = req.body.status;
      staff.reqid.push(req.body.reqid);
      console.log(req.body.reqid);
      const updatedStaff = await staff.save();
      res.status(200).json({
        message: "Staff updated successfully",
        data: updatedStaff,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});
router.put("/staff/complete/:id", async function (req, res) {
  try {
    let id = req.params.id;

    let staff = await StaffModel.findOne({ hid: id });
    if (!staff) {
      return res
        .status(404)
        .send("The staff you are trying to update does not exist.");
    } else {
      staff.status = req.body.status;
      // console.log(req.body.reqid);
      const updatedStaff = await staff.save();
      res.status(200).json({
        message: "Staff updated successfully",
        data: updatedStaff,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.delete("/staff/remove/:id", async function (req, res) {
  try {
    const removed = await StaffModel.findOneAndDelete({ hid: req.params.id });
    if (!removed) {
      return res.status(404).json("No staff with provided ID found!");
    } else {
      res.status(200).json({
        message: "Staff deleted successfully",
        data: removed,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

module.exports = router;
