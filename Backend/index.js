const express=require("express");
const { connection } = require("./config/db");
const { auth } = require("./Middleware/auth.middleware");
const { postRoute } = require("./routes/post.route");
const { UserRoute} = require("./routes/user.route");
require("dotenv").config();
const app=express();
app.use(express.json());
app.use("/user",UserRoute);
 
app.get("/", (req,res)=>{
    res.send("Welcome to home page");
})

app.use(auth)
app.use("/post", postRoute)

app.listen(process.env.port, async(req,res)=> {
        try {
           await connection
           console.log("Connected to DB ") 
        } catch (error) {
            console.log("Error while connecting");
            console.log(error)
        }  
     console.log("Server is running at PORT 8080 !");
})