import express from "express";
import { createArticle, deleteArticle, getArticleById, getArticlesPaginated, updateAtricle } from "../controllers/article.controller.js";

const articlesRoute = express.Router();

articlesRoute.post("/create", createArticle);
articlesRoute.put("/update/:id", updateAtricle);
articlesRoute.get("/get/:id", getArticleById);
articlesRoute.delete("/delete/:id", deleteArticle);
articlesRoute.get("/get-paginated", getArticlesPaginated);

export default articlesRoute;