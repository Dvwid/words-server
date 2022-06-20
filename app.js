import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {wordsRouter} from './routes/words.js';
import {usersRouter} from "./routes/users.js";
import {verifyRouter} from "./routes/verifyUser.js";


// dotenv.config()
const PORT = 5000;
const app = express();

app.use(cors());
app.use('/words', wordsRouter);
app.use('/users', usersRouter);
app.use('/verifyUser', verifyRouter);
app.get('/', (req, res) => {
    res.send('Hello world')
});

app.listen(process.env.PORT || 5000, () => {
    console.log('App listening on port', PORT);
})

