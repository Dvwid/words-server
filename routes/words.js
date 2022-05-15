import express from 'express';
import db from '../db_config.js';

const router = express.Router();

const query = {
    name: `get-words`,
    text: `SELECT * FROM words LIMIT 10`
}

router.get('/', (req, res) => {
    db.query(query, (err, response) => {
        if (err) throw err;
        res.send(response)
    })
})

export {router as wordsRouter}