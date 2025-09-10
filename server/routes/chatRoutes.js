import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { createChat, deleteChat, getChats } from '../controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.get("/create", authMiddleware, createChat);
chatRouter.get("/get", authMiddleware, getChats);
chatRouter.post("/delete", authMiddleware, deleteChat);

export default chatRouter;