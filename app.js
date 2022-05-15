import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {wordsRouter} from './routes/words.js';
import {usersRouter} from "./routes/users.js";


dotenv.config()
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use('/words', wordsRouter);
app.use('/users', usersRouter);
app.get('/', () => {});

app.get("/users/login", (req, res) => {
    res.send(req.body);
})

app.listen(PORT, () => {
    console.log('App listening on port', PORT);
})

