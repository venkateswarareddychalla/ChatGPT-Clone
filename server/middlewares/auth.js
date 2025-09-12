import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;
    console.log("Auth middleware token:", token);
    try{
        const decoded_token = jwt.verify(token, process.env.JSON_WEB_TOKEN);
        console.log("Decoded token:", decoded_token);
        const userId = decoded_token.id;

        const user = await userModel.findById(userId);
        console.log("User found in auth middleware:", !!user);

        if(!user){
            console.log("User not found in auth middleware");
            return res.json({success: false, message: "Not authorized, user not found"})
        }
        req.user = user;
        next();
    }
    catch(error){
        console.log("Auth middleware error:", error.message);
        res.status(401).json({success: false, message: "Not authorized, token failed"})
    }
}
