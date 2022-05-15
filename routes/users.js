import express from 'express';
import db from '../db_config.js';
import * as bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
const jsonParser = bodyParser.json();

const router = express.Router();

const query = {
    name: 'create-user',
    text: `INSERT INTO users(name, email, password)
           VALUES ($1,$2,$3)
           RETURNING id, password`
}

router.post("/register", jsonParser, async (req, res) => {
    let {name, email, password} = req.body;
    if (email && password) {
        let hashedPassword = await bcrypt.hash(password, 10);
        db.query(`SELECT email FROM users WHERE email = $1`, [email], (err, results) => {
                if (err) return res.status(400).send(err);
                if (results.rows.length > 0) return res.status(400).send('Email is already registered');
                db.query(query, [name, email, hashedPassword], (err) => {
                        if (err) {
                            throw err
                        }
                        res.status(200).send('You are now registered. Please log in');
                    }
                )
            }
        );
    }
})

router.post("/login", jsonParser, async (req, res) => {
    let {email, password} = req.body;

    if (email && password) {
         db.query(`SELECT id, email, password FROM users WHERE email = $1`, [email], async (err, results) => {
                if (err) return res.status(400).send(err);
                if (results.rows.length === 0) return res.status(400).send('Email is not found');
                const validPass = await bcrypt.compare(password, results.rows[0].password);
                if(!validPass) return res.status(400).send('Wrong password');
                //
                const token = await jwt.sign({_id: results.rows[0].id, }, process.env.TOKEN_SECRET, {}, () => {});
                res.header('auth-token', token);
            }
        );
    }
})

export {router as usersRouter}