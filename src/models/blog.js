const mongoose = require("./index");
const Status = require("../common/utils");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is Required"] },
    imageUrl: { type: String },
    shortDesc: { type: String, required: [true, "shortDesc is required"] },
    desc: { type: String, required: [true, "Desc is required"] },
    modifiedAt: { type: Date },
    status:{type:String,default:Status.PENDING},
    createdBy:{type:String,required:[true,"Created By is required"]},
    approvedBy:{type:String},
    modifiedAt:{type:Date},
    rejectedBy:{type:String},
    reason:{type:String,default:""},
    createdAt: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;
