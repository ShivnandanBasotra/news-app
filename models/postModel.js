import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    likes: {
        type: Number,
        default:0,
        min: [0, "Likes cannot be negative"],
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Author is required"],
    },
    category: {
        type: String,
        enum: {
            values: ['crime', 'sports', 'politics', 'business', 'entertainment', 'technology', 'others'],
            message: '{VALUE} is not a supported category'
        },
        required: [true, "Category is required"],
    },
    image: {
        type: String,
    },
    heading: {
        type: String,
        required: [true, "Heading is required"],
        trim: true,
        minLength: [5, "Heading must be at least 5 characters"],
        maxLength: [40, "Heading cannot exceed 100 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minLength: [20, "Description must be at least 20 characters"],
        maxLength: [5000, "Description cannot exceed 5000 characters"]
    }
    
},{
    timestamps: true
})

const Post = mongoose.model('Post',postSchema);

export default Post;