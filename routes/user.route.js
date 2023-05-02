const express=require("express");
const { UserModel } = require("../models/user.model");
const bcrypt=require("bcrypt");
const UserRoute=express.Router();
const jwt=require("jsonwebtoken");
require("dotenv").config(); 


UserRoute.post("/register",  async (req,res)=> {
    const {email,password,age,name}=req.body;
  try {
      const userbody = await UserModel.findOne({email})
      if(userbody){
        res.send({"msg" : "User Already Exists .Please Login !"})
      }else{
        bcrypt.hash(password,4,async(err,hash)=>{
            if(err){
                console.log(err);
            }else{
                const Newuser= UserModel({name,email,password: hash,age});
                await Newuser.save()
                res.status(200).json({"msg" : "User Registered Successfully"})
            }
        })
    
      }
 
  } catch (error) {
      res.status(400).json({"msg" : "Error while Registering"})
  }
})

UserRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await UserModel.findOne({email})
      
        if(user){ 
           bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({"authorId" : user._id , "authorName" : user.name}, process.env.secret )
                    res.send({"msg" : "Login Successful","token" : token })
                }else{
                    res.send({"msg" : "Wrong Credentials !"})
                }
             }) 
               }else {
                res.status(400).json({"msg" : "Wrong Credentials !"})
               }
    } catch (error) {
         console.log(error)
        res.status(400).json({"msg" : "Error while Login !"})
    }
})
module.exports={
    UserRoute
}