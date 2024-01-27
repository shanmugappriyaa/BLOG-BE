const mongoose = require("./index");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is Required"] },
    imageUrl: { type: String },
    shortDesc: { type: String, required: [true, "shortDesc is required"] },
    desc: { type: String, required: [true, "Desc is required"] },
    modifiedAt: { type: Date },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;
