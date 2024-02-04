const blogModel =require("../models/blog");
const Status =require ('../common/utils') 

const getAllBlogs =async(req,res)=>{
    try {
        let blogs = await blogModel.find({status:Status.APPROVED},
            {_id:1,title:1,imageUrl:1,createdAt:1,desc:1}).sort({createdAt:1})
            res.status(200).send({
                messasge:"blogs fetched successfully",
                blogs
            })
        
    } catch (error) {
        res.Status(500).send({
            meassage:"Internal Server Error"
        })
    }
}

module.exports={getAllBlogs}
