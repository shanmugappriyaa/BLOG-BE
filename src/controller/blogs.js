const blogModel = require("../models/blog");
const Status = require("../common/utils");
const { cloudinaryUploadImg } = require("../common/cloudinary");
const fs = require("fs");

const createBlog = async (req, res) => {
  try {
    const { title, imageUrl, desc, shortDesc } = req.body;
    if (title && desc) {
      const result = await blogModel.create({
        title,
        desc,
        shortDesc,
        createdUserName: req.headers.firstName,
        createdBy: req.headers.userId,
        blogstatus: "PENDING",
      });

      res.status(201).send({
        messasge: "blog created successfully",
        result,
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
    if (req?.headers?.role == "admin") {
      let allBlogs = await blogModel
        .find(
          {},
          {
            _id: 1,
            title: 1,
            imageUrl: 1,
            shortDesc: 1,
            createdAt: 1,
            blogstatus: 1,
            createdUserName: 1,
          }
        )
        .sort({ createdAt: 1 });
      res.status(200).send({
        messasge: "blogs fetched successfully",
        allBlogs,
      });
    } else {
      let allBlogs = await blogModel
        .find(
          { blogstatus: "APPROVED" },
          {
            _id: 1,
            title: 1,
            imageUrl: 1,
            shortDesc: 1,
            createdAt: 1,
            blogstatus: 1,
            createdUserName: 1,
          }
        )
        .sort({ createdAt: 1 });
      res.status(200).send({
        messasge: "blogs fetched successfully",

        allBlogs,
      });
    }
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
const getBlogByStatus = async (req, res) => {
  let blogstatus = req.params.status;

  try {
    let blog = await blogModel.find({ blogstatus: blogstatus });

    res.status(200).send({
      blog,
    });
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
      (blog.title = title),
        (blog.desc = desc),
        (blog.blogstatus = "PENDING"),
        (modifiedAt = Date.now());

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
    const { blogstatus } = req.body;
    console.log("blogId,blogstatus-->", blogId, blogstatus, req.headers.userId);
    if (blogId && blogstatus) {
      // const { reason } = req.body;
      let blog = await blogModel.findById(blogId);
      (blog.blogstatus = blogstatus),
        (blog.approvedBy = req.headers.userId),
        (blog.modifiedAt = Date.now());
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
        { createdBy: req.params.id },
        {
          _id: 1,
          title: 1,
          imageUrl: 1,
          createdAt: 1,
          shortDesc:1,
          blogstatus: 1,
          createdUserName: 1,
        }
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

const uploadImages = async (req, res) => {
  const { id } = req.params;
  console.log(req.files);
  try {
    const uploader = (path) => cloudinaryUploadImg(path);
    const urls = [];
    const files = req.files;
    for (let i = 0; i < req.files.length; i++) {
      let locaFilePath = req.files[i].path;
      const newpath = await uploader(locaFilePath);

      urls.push({
        url: newpath?.secure_url,
        asset_id: newpath?.asset_id,
        public_id: newpath?.public_id,
      });
      fs.unlinkSync(locaFilePath);
    }

    const findBlog = await blogModel.findByIdAndUpdate(
      id,
      {
        imageUrl: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );

    res.status(200).send({
      msg: "images uploaded Succssfully",
      findBlog,
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
  getBlogByStatus,
  uploadImages,
};
