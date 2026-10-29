import Article from "../models/articles.model.js"


export const getArticlesPaginated = async (req, res) => {
    const page = Math.max(
        1,
        parseInt(String(req.query.page ?? "1"), 10) || 1
    );

    const pageSize = Math.max(
        1,
        parseInt(String(req.query.pageSize ?? "10"), 10) || 10
    );

    const search = String(req.query.search ?? "").trim().toLowerCase();

    try {
        const articles = await Article.find({})
            .sort({ createdAt: -1, _id: -1 });

        const filteredArticles = articles.filter((article) =>
            (article.title ?? "").toLowerCase().includes(search)
        );

        const totalArticles = filteredArticles.length;
        const totalPages = Math.ceil(totalArticles / pageSize);
        const startIndex = (page - 1) * pageSize;

        return res.status(200).json({
            isSuccess: true,
            data: filteredArticles.slice(
                startIndex,
                startIndex + pageSize
            ),
            page,
            pageSize,
            totalArticles,
            totalPages,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            isSuccess: false,
            message: "Error on the server",
        });
    }
};


export const getArticleById = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findById(id);
        if (!article) {
            res.status(404).json({ isSuccess: false, message: "The article was not found!" })
        }
        res.status(200).json({ isSuccess: true, message: "Successfully found!", data: article })
    } catch (error) {
        res.status(500).json({ isSuccess: false, message: "Error on the server side!" })
    }

}


export const createArticle = async (req, res) => {
    const article = req.body

    if (!article.title || !article.description || !article.content || !article.readingTime) {
        res.status(400).json({ isSuccess: false, message: "All fields required" });
    }

    const article_new = new Article(article);

    try {
        await article_new.save()

        res.status(201).json({
            isSuccess: true,
            message: "Article created successfully",
            data: article,
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            isSuccess: false,
            message: "Internal server error",
        })
    }
}


export const updateAtricle = async (req, res) => {
    const { id } = req.params;

    const article = req.body;

    if (!article.title || !article.description || !article.content || !article.readingTime) {
        return res.status(400).json({ isSuccess: false, message: "All fields required" });
    }

    try {
        await Article.findByIdAndUpdate(id, article);
        res.status(200).json({ isSuccess: true, message: "The article was updated successfully!" })
    } catch (error) {
        console.log("Error occured!");
        return res.status(500).json({ isSuccess: false, message: "Error occured while updating the article" })
    }
}

export const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        await Article.findByIdAndDelete(id);
        res.status(200).json({ isSuccess: true, message: "The article was deleted successfully!" })
    } catch (error) {
        res.status(500).json({ isSuccess: false, message: "Error occurred on server side" })
    }
}
