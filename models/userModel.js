import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        lowercase: true,
        minLength: [3, "Username must be at least 3 characters"],
        maxLength: [14, "Username cannot exceed 14 characters"],
    },
    password: {
        type: String,
        required: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
},{
    timestamps: true
})

const User = mongoose.model('User',userSchema);

export default User;

