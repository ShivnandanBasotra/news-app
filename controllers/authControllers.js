import genTokenAndSetCookie from "../helpers/genTokenAndSetCookie.js";
import User from "../models/userModel.js";
import { createPostSchema } from "../zodValidations/postValidations.js";
import { userLoginSchema, userSignupSchema } from "../zodValidations/userValidations.js";
import bcrypt from "bcrypt"


export async function signupUser (req,res) {
    const { username,  password } = req.body;
    const saltRounds = 10;
    try {
        const zodValidationResult = userSignupSchema.safeParse({
            username,
            password
        })
        if(!zodValidationResult.success) return res.status(400).json({errors: zodValidationResult.error.issues.map(issue=>`property:${issue.path}:- ${issue.message}`)});
        
        const existingUser = await User.findOne({
            username
        })
        if (existingUser) return res.status(409).json({ error: "user already exits" });
    
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            username,
            password: hashedPassword
        })
        const savedUser = await user.save();
        const token = genTokenAndSetCookie(savedUser._id, res);
        res.status(201).json({
            message: "user created successfully",
            user: {
                _id: savedUser._id,
                username: savedUser.email,
                token
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log("error occured in signupUser", error.message);
    }
}


export async function loginUser(req, res) {
    const { username, password } = req.body;
   
    try {
        const zodValidationResult = userLoginSchema.safeParse({
            username,
            password
        })
        if (!zodValidationResult.success) {
            const messages = zodValidationResult.error.issues.map(issue => {
                return issue.message;
            });
            return res.status(400).json({ error: messages })
        }
        ;
        
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: "username not found" });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(401).json({ error: "incorrect password" });

        const token = genTokenAndSetCookie(user._id, res);

        res.status(201).json({
            message: "loggedin successfully",
            user: {
                _id: user._id,
                username: user.username,
                token
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log("error occured in loginUser", error.message);
    }
}



