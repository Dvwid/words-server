import * as dotenv from "dotenv";
import pg from "pg";

// dotenv.config()

const Pool = pg.Pool

const db = new Pool({
    user: 'jlzhxazdxouxle',
    host: 'ec2-34-247-172-149.eu-west-1.compute.amazonaws.com',
    database: 'dej4ksgj54bktd',
    password: '7bb142e9df6ffa45602c04199e0e993aaa70750b9aba27e810a5f3ee5c7eeeaa',
    port: 5432,
})

export default db;