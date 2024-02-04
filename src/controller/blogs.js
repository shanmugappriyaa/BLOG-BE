const blogModel = require("../models/blog");
const Status = require("../common/utils");

const createBlog = async (req, res) => {
  try {
    const { title, imageUrl, desc, shortDesc } = req.body;
    if (title && imageUrl && desc) {
      await blogModel.create({
        title,
        imageUrl,
        desc,
        shortDesc,
        createdBy: req.headers.userId,
      });
      res.status(201).send({
        messasge: "blog created successfully",
      });
    } else {
      res.status(400).send({
        messasge: "title,imageUrl,desc required",
      });
    }
  } catch (error) {
    res.status(500).send({
      messasge: "Internal server Error",
      error: error.messasge,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    let allBlogs = await blogModel
      .find({}, { _id: 1, title: 1, imageUrl: 1, shortDesc: 1, createdAt: 1 })
      .sort({ createdAt: 1 });
    res.status(200).send({
      messasge: "blogs fetched successfully",

      allBlogs,
    });
  } catch (error) {
    res.status(500).send({
      messasge: "Internal server Error",
      error: error.messasge,
    });
  }
};
const getBlogById = async (req, res) => {
  try {
    let blogId = req.params.id;
    // console.log("blogId===========> ", blogId);
    if (blogId) {
      let blog = await blogModel.findOne({ _id: req.params.id });
      res.status(200).send({
        blog,
      });
    } else {
      res.status(400).send({
        messasge: "blog id not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      messasge: "Internal server Error",
      error: error.messasge,
    });
  }
};

const editBlog = async (req, res) => {

  try {
    let blogId = req.params.id;
    if (blogId) {
      const { title, imageUrl, desc } = req.body;
      let blog = await blogModel.findOne({ _id: req.params.id });
      (blog.title = title), (blog.desc = desc), (modifiedAt = Date.now());
  
      await blog.save();
      res.status(200).send({
        messasge: "blog updated successfully",
      });
    } else {
      res.status(400).send({ messasge: "blogId not found" });
    }
  } catch (error) {
    res.status(500).send({
      messasge: "Internal server Error",
      error: error.messasge,
    });
  }
};

const updateBlogStatus = async (req, res) => {
  try {
    const blogId = req.params.id;
    const status = req.params.status;
    if (blogId && status) {
      const { reason } = req.body;
      let blog = await blogModel.findById(blogId);
      if (status === Status.APPROVED) {
        blog.status = Status.APPROVED;
        blog.approvedBy = req.headers.userId;
        blog.reason = "";
      } else if (status === Status.REJECTED) {
        blog.status = Status.REJECTED;
        blog.rejectedBy = req.headers.userId;
        blog.reason = reason;
      } else {
        blog.status = Status.PENDING;
      }
      blog.modifiedAt = Date.now();
      await blog.save();

      res.status(200).send({
        message: "Blog Status Updated Successfully",
      });
    } else {
      res.status(400).send({ message: "Blog Id Not found" });
    }
  } catch (error) {
    res.status(500).send({
      messasge: "Internal server Error",
      error: error.messasge,
    });
  }
};
const getBlogsByUserId = async (req, res) => {
  try {
    let blogs = await blogModel
      .find(
        { createdBy: req.headers.userId },
        { _id: 1, title: 1, imageUrl: 1, createdAt: 1, status: 1 }
      )
      .sort({ createdAt: 1 });
    res.status(200).send({
      message: "Blogs Fetched Successfully",
      blogs,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  editBlog,
  getBlogsByUserId,
  updateBlogStatus,
};
