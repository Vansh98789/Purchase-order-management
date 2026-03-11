import express from "express";
import vendor_auth from "./routes/vendor_auth";
import cookieParser from "cookie-parser";
import product from "./routes/create-product";
import authMiddleware from "./middleware/authMiddleware";
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use("/vendor",vendor_auth);
app.use("/product",authMiddleware,product);

app.listen(3000,()=>{
    console.log("starting server on port 3000")
})