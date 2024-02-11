const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HousekeepingDb");

var Schema = mongoose.Schema;

var reqSchema = new Schema(
  {
    reqid: String,
    date: String,
    timings: String,
    reqs: Array,
    hid: String,
    status: String,
    stdid: String,
  },
  { versionKey: false }
);

var ReqModel = mongoose.model("Requests", reqSchema, "Requests");
module.exports = ReqModel;
