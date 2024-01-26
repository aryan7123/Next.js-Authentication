import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database successfully");
    } catch (error) {
        console.error(error);
    }
}

export default Connection;