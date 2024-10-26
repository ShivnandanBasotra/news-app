import express from "express";
import { loginUser, signupUser } from "../controllers/authControllers.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";
import { createNewsPost, getPost } from "../controllers/postControllers.js";
import protectRoute from "../middlewares/protectUserRoute.js";

const router = express.Router();
router.post('/auth/signup',signupUser)
router.post('/auth/login',loginUser);
router.post('/news/post',protectRoute ,uploadMiddleware, createNewsPost);
router.get('/news/get', getPost);

export default router;