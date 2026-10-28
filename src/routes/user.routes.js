import express from "express";
import { checkCredentials } from "../controllers/user.controllers.js";

const usersRoute = express.Router();

usersRoute.post("/check", checkCredentials);

export default usersRoute;