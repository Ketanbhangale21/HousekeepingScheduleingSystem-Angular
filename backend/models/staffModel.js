const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HousekeepingDb");

var Schema = mongoose.Schema;

var staffSchema = new Schema(
  {
    hid: String,
    fname: String,
    lname: String,
    email: String,
    country: String,
    state: String,
    city: String,
    phone: Number,
    gender: String,
    status: String,
    reqid: Array,
  },
  { versionKey: false }
);

var StaffModel = mongoose.model("Housekeepers", staffSchema, "Housekeepers");

module.exports = StaffModel;
