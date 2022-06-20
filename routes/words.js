import express from 'express';
import db from '../db_config.js';
import { verify } from "./verifyToken.js"
import bodyParser from "body-parser";

const router = express.Router();
const jsonParser = bodyParser.json();

const query = {
    name: `get-words`,
    text: `SELECT * FROM words LIMIT 10`
}

const getRandomWords = {
    name: 'get-random',
    text: `select * from words order by random() limit $1;`
}

router.post('/', jsonParser, verify, (req, res) => {
    db.query(query, (err, response) => {
        if (err) res.status(400).json(err)
        res.json(response)
    })
})

router.post('/random',jsonParser, verify, (req, res) => {
    db.query(getRandomWords, [req.body.limit], (err, response) => {
        if (err) res.status(400).json(err)
        res.json(response.rows)
    })
})

export {router as wordsRouter}