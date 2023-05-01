const mongoose=require("mongoose");

const PostSchema=mongoose.Schema({
    "title" : {type : String , required : true },
    "category" : {type : String , required : true },
    "authorId" : {type : String , required : true },
    "authorName" : {type : String ,required : true }
})

const PostModel=mongoose.model("Post", PostSchema);

module.exports={
    PostModel
}