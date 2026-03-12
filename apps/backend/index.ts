import express from "express";
import cors from "cors";
import vendor_auth from "./routes/vendor_auth";
import cookieParser from "cookie-parser";
import product from "./routes/create-product";
import authMiddleware from "./middleware/authMiddleware";
import getProduct from "./routes/get-product";
import order from "./routes/place-order";

const app = express();

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,              
}));

app.use(express.json());
app.use(cookieParser());

app.use("/vendor", vendor_auth);
app.use("/product", authMiddleware, product);
app.use("/getProduct", getProduct);
app.use("/order", order);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});