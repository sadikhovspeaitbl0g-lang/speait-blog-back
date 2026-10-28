import bcrypt from "bcrypt"
import User from "../models/user.model.js";

export const checkCredentials = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "username and password are required" });
    }
    console.log(username, password)

    const user = await User.findOne();
    console.log(user)

    if(user.username != username){
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ isSuccess: true, message: "The credentials are valid!" })
}