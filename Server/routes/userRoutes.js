import express from 'express';
import { askToAssistant, getCurrentUser, updateAssistant } from '../controllers/userController.js';
import isAuth from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js'

const userRouter = express.Router();

userRouter.get('/current-user', isAuth, getCurrentUser);
userRouter.post('/update-assistant', isAuth, upload.single('assistantImage'), updateAssistant);
userRouter.post('/ask-assistant', isAuth, askToAssistant);

export default userRouter;