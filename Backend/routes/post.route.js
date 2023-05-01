const express=require("express");
const { PostModel } = require("../models/post.model");

const postRoute=express.Router()

// Post
postRoute.post("/create",async (req,res)=> {
    try {
         const new_post = PostModel(req.body)
         await new_post.save();
         res.send({"msg" : "New Post Created !"})

    } catch (error) {
        res.send(error)
    }
})
// Get 
postRoute.get("/",async(req,res)=>{
    try {
      let posts=  await PostModel.find();
       res.send(posts)
    } catch (error) {
         res.send(error)
    }
})

//Updated Successfully 
postRoute.patch("/update/:id",async(req,res)=>{
    try {
       const {id}=req.params;
       const {authorId}=req.body;

    const post =await PostModel.findOne({_id : id ,authorId})
        
        if(!post){
            return res.status(404).json({ error: "Post not found" });
        } else{
            await PostModel.findByIdAndUpdate(id,req.body)
            res.send({"msg" : "Post Updated"})
        }

    } catch (error) {
         res.send(error)
    }
})
// Delete Route
postRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {authorId}=req.body;

        const post= await PostModel.findOne({ _id : id , authorId})

        if(!post){
            res.status(400).json({"msg" : "Post Not found"});
        } 
           await PostModel.findByIdAndDelete(id);
           res.status(200).json({"msg" : "Post deleted Successfully "})
      
         
    } catch (error) {
         res.send(error)
    }
})

module.exports={
    postRoute
}