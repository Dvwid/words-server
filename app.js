import pg from 'pg'
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express();
const Pool = pg.Pool

const query = {
    name: `get-words`,
    text: `SELECT * FROM words`
}

app.use(cors());
app.get('/', (req, res) => {
    db.query(query, (err, response) => {
        if(err) throw err;
        res.send(response)
    })
})

app.listen(PORT, () => {
    console.log('App listening on port 3000')
})

const db = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

