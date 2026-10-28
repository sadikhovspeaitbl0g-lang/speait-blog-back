import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

async function connectDb() {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URI)

        console.log(
            `The database was connected successfully! ${res.connection.host}`
        )
    } catch (error) {
        console.error("Error occurred while connecting to db!")
        console.error(error)
        process.exit(1)
    }
}

export default connectDb