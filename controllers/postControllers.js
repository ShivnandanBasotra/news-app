import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { categorySchema, createPostSchema } from "../zodValidations/postValidations.js";

export async function createNewsPost(req, res) {
    const { heading, description, category } = req.body;
    const file = req.file;
    let image;
    const userId = req.user._id;
    try {
        const zodValidationResult = createPostSchema.safeParse({
            heading,
            description,
            category
        })
        if (!zodValidationResult.success) return res.status(400).json({ errors: zodValidationResult.error.issues.map(issue => `property:${issue.path}:- ${issue.message}`) });
        if (!file) image = '';
        if (file) image = file.path;
        const existingPost = await Post.findOne({ heading, description });
        if (existingPost) return res.status(400).json({ error: "it seems like post similar to this is already available. Duplicating the post is serious offence" });
        const post = new Post({
            author: userId,
            category,
            image,
            heading,
            description,
        });
        const savedPost = await post.save();
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $push: { posts: savedPost._id } },
            { new: true }
        );
        res.status(201).json({
            message: "post uploaded successfully",
            post: savedPost,
            user
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log("error occured in createNewPost", error.message);
    }
}


export async function getPost(req, res) {
    const { category } = req.query;
    try {
        if (category === undefined) {
            const posts = await Post.find()
                .populate({
                    path: 'author',
                    select: 'username'
                });
                return res.status(200).json({
                    posts: posts.map((post) => ({
                        _id: post._id,
                        likes: post.likes,
                        author: post.author.username,
                        category: post.category,
                        image: post.image,
                        heading: post.heading,
                        description: post.description,
                        createdAt: post.createdAt,
                        lastUpdated: post.updatedAt 
                    }))
                });
            }
        const zodValidationResult = categorySchema.safeParse(category);
        if (!zodValidationResult.success) return res.status(400).json({ error: "no post found with this category" });
        const posts = await Post.find({ category: category })
            .populate({
                path: 'author',
                select: 'username'
            });
        return res.status(200).json({
            posts: posts.map((post) => ({
                _id: post._id,
                likes: post.likes,
                author: post.author.username,
                category: post.category,
                image: post.image,
                heading: post.heading,
                description: post.description,
                createdAt: post.createdAt,
                lastUpdated: post.updatedAt 
            }))
        });
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log("error occured in getPost", error.message);
    }
}