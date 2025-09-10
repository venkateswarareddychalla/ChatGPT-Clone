import chatModel from "../models/chatModel.js";


// API controller for creating a new chat
export const createChat = async (req, res) => {
    try{
        const userId = req.user._id;
        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name
        };
        await chatModel.create(chatData);
        res.json({success: true, message: "Chat created"});
    }catch(error){
        res.json({success: false, message: error.message})
    }
}


// API Controller fro getting all chats of a user
export const getChats = async (req, res) => {
    try{
        const userId = req.user._id;
        const chats = await chatModel.find({userId}).sort({updatedAt: -1});
        res.json({success: true, chats});
    }catch(error){
        res.json({success: false, message: error.message})
    }
}


// API Controller for deleting a chat of user
export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const chatId = req.body;
        await chatModel.deleteOne({_id: chatId, userId});
        res.json({success: true, message: "Chat deleted "});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

