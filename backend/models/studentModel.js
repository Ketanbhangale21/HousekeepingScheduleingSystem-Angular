const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HousekeepingDb");

var Schema = mongoose.Schema;

var studentSchema = new Schema(
  {
    stdid: String,
    fname: String,
    lname: String,
    email: String,
    country: String,
    state: String,
    city: String,
    phone: Number,
    password: String,
    gender: String,
    secquestion: String,
    secanswer: String,
    hostel: String,
    roomno: Number,
    floorno: Number,
    reqid: Array,
  },
  { versionKey: false }
);

var StudentModel = mongoose.model("Students", studentSchema, "Students");

module.exports = StudentModel;
