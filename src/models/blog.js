const mongoose = require("./index");
const Status = require("../common/utils");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is Required"] },
    imageUrl: [],
    shortDesc: { type: String, required: [true, "shortDesc is required"] },
    desc: { type: String, required: [true, "Desc is required"] },
    blogstatus: { type: String },
    createdBy: { type: String, required: [true, "Created By is required"] },
    createdUserName: { type: String },
    approvedBy: { type: String },
    modifiedAt: { type: Date },
    rejectedBy: { type: String },
    reason: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;
