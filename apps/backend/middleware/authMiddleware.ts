import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest } from "../types/express";


const authMiddleware=async(req:AuthRequest,res:Response,next:NextFunction)=>{
     try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        msg: "Unauthorized"
      });
    }

    const decoded = jwt.verify(token, "abcdefgh");

    req.userId = decoded.id;

    next();

  } catch (e) {
    return res.status(401).json({
      msg: "Invalid token"
    });
  }
};
export default authMiddleware;

