import dotenv from 'dotenv';
import connectDB from './db/connectDB.js'
import express from "express"
import cookieParser from 'cookie-parser';
import router from './routes/userRoutes.js';
import {v2 as cloudinary} from 'cloudinary'

dotenv.config();

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/user',router);

app.listen(PORT,()=>{console.log(`Server started at http://localhost:${PORT}`);});