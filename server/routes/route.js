import express from 'express';

import { addUser, getUsers } from '../controller/user-controller.js';
import { getConversation, newConversation } from '../controller/conversation-controller.js';
import { getMessages, newMessage } from '../controller/message-controller.js';
import { getImage, uploadFile } from '../controller/image-controller.js';
import upload from '../utils/upload.js';

const route = express.Router();

// endpoints like /add

route.post('/add', addUser);
route.get('/users', getUsers);

route.post('/conversation/add', newConversation);
route.post('/conversation/get', getConversation);

route.post('/message/add', newMessage);
route.get('/message/get/:id', getMessages);

// upload.single("file") -> middleware before calling the api
route.post('/file/upload', upload.single("file"), uploadFile);
route.get('/file/:filename', getImage);

export default route;