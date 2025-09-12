import userModel from "../models/userModel.js";
import chatModel from "../models/chatModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate Json Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JSON_WEB_TOKEN, { expiresIn: "30d" });
};

// API to register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already Exists" });
    }

    // const newUser = new userModel({
    //     name: name,
    //     email: email,
    //     password: hashedPassword,

    // })
    // await newUser.save();
    const newUser = await userModel.create({ name, email, password });

    const token = generateToken(newUser._id);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt for email:", email);
  try {
    const userExists = await userModel.findOne({ email });
    console.log("User exists:", !!userExists);
    if (!userExists) {
      console.log("User not found");
      return res.json({ success: false, message: "User doesn't exist" });
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      userExists.password
    );
    console.log("Password match:", isPasswordMatched);
    if(!isPasswordMatched){
        console.log("Invalid password");
        return res.json({success: false, message: "Invalid username or password"})
    }
    const token = generateToken(userExists._id);
    console.log("Login successful, token generated");
    return res.json({success: true, token})
  } catch (error) {
    console.log("Login error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to get user data
export const getUserData = async (req, res) => {
  try{
    const user = req.user;
    return res.json({success: true, user})
  }
  catch(error){
    return res.json({success: false, message: error.message})
  }
}

// API to get published images
export const getPublishedImages = async (req, res) => {
  try{
    const publishedImageMessages = await chatModel.aggregate([
      {$unwind: "$messages"},
      {
        $match: {
          "messages.isImage": true,
          "messages.isPublished": true
        }
      },
      {
        $project: {
          _id: 0,
          imageUrl: "$messages.content",
          userName: "$userName"
        }
      }
    ])
    res.json({success: true, images: publishedImageMessages.reverse()})
  } catch(error){
    return res.json({success: false, message: error.message})
  }
}