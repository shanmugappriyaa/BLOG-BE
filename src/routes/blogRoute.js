const express = require("express");
const blogController = require("../controller/blogs");
const Auth = require("../common/Auth");
const router = express.Router();
const {uploadPhoto}  = require('../common/uploadImage')

router.post("/create", Auth.validate, blogController.createBlog);
router.put('/upload/:id',uploadPhoto.array('images',10),blogController.uploadImages)
router.get("/", Auth.validate, blogController.getAllBlogs);
router.get("/status/:status", blogController.getBlogByStatus);
router.get('/userblogs/:id',blogController.getBlogsByUserId)
router.get("/:id", blogController.getBlogById);
router.put("/edit/:id", blogController.editBlog);
router.put(
  "/updatestatus/:id",
  Auth.adminGaurd,
  blogController.updateBlogStatus
);

module.exports = router;
