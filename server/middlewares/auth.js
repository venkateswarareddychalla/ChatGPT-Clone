import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

export const authMiddleware = async (req, resizeBy, next) => {
    let token = req.headers.authorization;
    try{
        const decoded_token = jwt.verify(token, process.env.JSON_WEB_TOKEN);
        const userId = decoded_token.id;

        const user = await userModel.findById(userId);

        if(!user){
            return resizeBy.json({success: false, message: "Not authorized, user not found"})
        }
        req.user = user;
        next();
    }
    catch(error){
        resizeBy.status(401).json({success: false, message: "Not authorized, token failed"})
    }
}
