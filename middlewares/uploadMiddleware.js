import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {v2 as cloudinary} from 'cloudinary'


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'news-app-images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

export const uploadMiddleware = upload.single('image'); 
