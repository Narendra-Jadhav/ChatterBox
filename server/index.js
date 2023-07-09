import express from 'express';
// as we are using import, then we are using modules. So, in package.json adding "type": "module" field
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Route from './routes/route.js';

const app = express();

app.use(cors());
// parsing the body got as response from api
app.use(bodyParser.json({ extended: true }));
// parsing the url entered by user in the tab. eg. if user enters spaces, browser will replace it with %20
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Route);

Connection();

const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));