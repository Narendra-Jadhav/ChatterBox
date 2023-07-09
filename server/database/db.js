import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const Connection = async () => {
    const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@chatterbox-cluster.fkhcbo7.mongodb.net/?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error.message);
    }
}

export default Connection;