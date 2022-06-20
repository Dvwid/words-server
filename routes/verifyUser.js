import express from 'express';
import db from '../db_config.js';
import {verify} from "./verifyToken.js"
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const router = express.Router();
const jsonParser = bodyParser.json();


router.post('/', jsonParser, verify, async (req, res) => {
    const token = req.body.bearer;
    try {
        req.user = await jwt.verify(token, process.env.TOKEN_SECRET);
        db.query(`SELECT id, name, avatar FROM users WHERE id = $1`, [req.user._id], async (err, results) => {
            if (err) return res.status(400).json(err);
            if (results.rows.length === 0) return res.status(400).json('User not found');
            res.json(results.rows[0]);
        })
    } catch (err) {
        res.status(400).json('Invalid Token');
    }
})

export {router as verifyRouter}