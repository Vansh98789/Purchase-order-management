import express from "express";
import {prisma} from "../../packages/common/db"
const app=express();


app.listen(3000,()=>{
    console.log("starting server on port 3000")
})