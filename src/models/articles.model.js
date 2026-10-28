import mongoose, { Schema, Document, Model } from "mongoose"

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        readingTime: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Article = mongoose.model("Article", articleSchema);
export default Article;