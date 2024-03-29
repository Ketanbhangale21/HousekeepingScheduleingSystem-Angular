const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const StudentModel = require("../models/studentModel");
router.use(express.json());
router.get("/students", async function (req, res) {
  try {
    let result = await StudentModel.find(
      { email: { $ne: "admin@example.com" } },
      { _id: 0 }
    )
      .sort({ stdid: 1 })
      .lean();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/students/all", async function (req, res) {
  try {
    let result = await StudentModel.find({ _id: 0 }).sort({ stdid: 1 }).lean();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get(
  "/students/:id",

  async function (req, res) {
    const errors = validationResult(req);
    var id = req.params.id;
    try {
      const data = await StudentModel.findOne({ stdid: id }, { _id: 0 }).lean();
      if (!data) return res.status(404).send(`No record with ${id}`);
      else {
        res.send(data);
        // console.table(data);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const user = await StudentModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Unregistered Email-Id" });
    }
    if (user && user.password === password) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      // console.log("Incpass");
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.post(
  "/students",
  [
    body("fname").notEmpty().withMessage("First name is required"),
    body("lname").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("country").notEmpty().withMessage("Country is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("phone").isNumeric().withMessage("Phone number must be numeric"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("roomno").notEmpty().withMessage("Room number is required"),
    body("floorno").notEmpty().withMessage("Floor number is required"),
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newStudent = new StudentModel(req.body);
      const createdStudent = await newStudent.save();
      res.status(201).json({
        message: "Student created successfully",
        data: createdStudent,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
);

router.put(
  "/students",
  [
    body("fname").notEmpty().withMessage("Name is required"),
    body("lname").notEmpty().withMessage("Name is required"),
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
      let studentid = req.body.stdid;
      let student = await StudentModel.findOne({ stdid: studentid });
      if (!student) {
        return res
          .status(404)
          .send("The student you are trying to update does not exist.");
      } else {
        student.fname = req.body.fname;
        student.lname = req.body.lname;
        student.email = req.body.email;
        student.country = req.body.country;
        student.state = req.body.state;
        student.city = req.body.city;
        student.phone = req.body.phone;
        student.gender = req.body.gender;
        const updatedStudent = await student.save();
        res.status(200).json({
          message: "Student updated successfully",
          data: updatedStudent,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
);
router.put("/students/reset", async function (req, res) {
  try {
    let studentemail = req.body.email;
    console.log(req.body);
    let student = await StudentModel.findOne({ email: studentemail });
    console.log(student);
    if (!student) {
      return res
        .status(404)
        .send("The student you are trying to update does not exist.");
    } else {
      student.password = req.body.password;
      const updatedStudent = await student.save();
      res.status(200).json({
        message: "Student updated successfully",
        data: updatedStudent,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});
router.put("/students/request/:id", async function (req, res) {
  try {
    let id = req.params.id;
    console.log(id);
    let student = await StudentModel.findOne({ stdid: id });
    console.log(student);
    if (!student) {
      return res
        .status(404)
        .send("The student you are trying to update does not exist.");
    } else {
      student.reqid.push(req.body.reqid);
      const updatedStudent = await student.save();
      res.status(200).json({
        message: "Student updated successfully",
        data: updatedStudent,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.delete("/students/remove/:id", async function (req, res) {
  try {
    const removed = await StudentModel.findOneAndDelete({
      stdid: req.params.id,
    });
    if (!removed) {
      return res.status(404).json("No student with provided id found!");
    } else {
      res.status(200).json({
        message: "Student deleted successfully",
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
