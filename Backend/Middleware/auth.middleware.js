const jwt=require("jsonwebtoken");
require("dotenv").config();
const auth=(req,res,next)=>{

    const token=req.headers.authorization;
       
    if(token){
      try {
         const decode=jwt.verify(token, process.env.secret);
        
         if(decode){
              req.body.authorId = decode.authorId
              req.body.authorName = decode.authorName;
              next();
         }else{
            res.send({"msg" : "Not authorized "})
         }
      } catch (error) {
         res.send(error)
      }
    }else{
        res.send({"msg" : "Login first !"})
    }
}
module.exports={
    auth 
}