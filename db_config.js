import pg from "pg";

const Pool = pg.Pool

const db = new Pool({
    connectionString: "postgres://jlzhxazdxouxle:7bb142e9df6ffa45602c04199e0e993aaa70750b9aba27e810a5f3ee5c7eeeaa@ec2-34-247-172-149.eu-west-1.compute.amazonaws.com:5432/dej4ksgj54bktd",
    ssl: {
        rejectUnauthorized: false
    }
})

export default db;