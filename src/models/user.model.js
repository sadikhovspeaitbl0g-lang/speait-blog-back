import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = new mongoose.model("Users", userScheme);
export default User;