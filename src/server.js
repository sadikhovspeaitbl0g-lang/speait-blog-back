import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express";
import articlesRoute from "./routes/article.routes.js";
import rateLimit from "express-rate-limit";
import cors from "cors";
import usersRoute from "./routes/user.routes.js";


const app = express()


// Set up rate limiter: maximum of 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://speait-blog-front-xi.vercel.app",
  ],
};



dotenv.config()

await connectDB()

app.use(cors(corsOptions));
app.use(limiter);


//We set up a limit if the data is too big for example 7 paged paper
app.use(express.json({ limit: "5mb" }));


app.use("/api/articles", articlesRoute);
app.use("/api/users", usersRoute);


const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})