import express from 'express';
import { getPublishedImages, getUserData, loginUser, registerUser } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', authMiddleware, getUserData);
userRouter.get('/published-images', authMiddleware, getPublishedImages);

export default userRouter;