// middleware which will be called before calling the api

import multer from 'multer';
// for reading the Form data of the file which is in binary
import { GridFsStorage } from 'multer-gridfs-storage';
// for adding file to MongoDB

import dotenv from "dotenv";

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@chatterbox-cluster.fkhcbo7.mongodb.net/?retryWrites=true&w=majority`,
    options: { useUnifiedTopology: true, useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.mimeType) === -1) {
            return `${Date.now()}-file-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`,
        }
    }
});

export default multer({ storage });