const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPosts = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    _img: String,
}, { timestamps: true });
const Blog = mongoose.model("Blog", blogPosts);

module.exports = Blog;