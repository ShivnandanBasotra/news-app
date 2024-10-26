import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export default async function protectRoute (req, res, next) {
    const token = req.cookies.jwt;
    try {
        if (!token) return res.status(400).json({error: "unauthorized access"});
        const decoded =  jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId); 
        if(!user) return res.status(400).json({error: "unauthorized access"});
        req.user = user;
        next();   
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log("error occured in protectRoute middleware", error.message);
    }
}