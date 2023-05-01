const express=require("express");
const { connection } = require("./config/db");
 
const app=express();
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Welcome to home page");
})

app.listen(8080, async(req,res)=> {
        try {
           await connection
           console.log("Connected to DB Atlas") 
        } catch (error) {
            console.log("Error while connecting");
            console.log(error)
        }  
     console.log("Server is running at PORT 8080 !");
})