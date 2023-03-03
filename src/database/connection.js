require("dotenv").config()
const sql = require("mssql")

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || "localhost",
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    },
    port: Number(process.env.DB_PORT) || 1433
}

const getConnection = async () => {
    try {
        const pool = await sql.connect(dbConfig)
        return pool
    } catch (error) {
        console.error("Error creating connection pool", error)
    }
}

module.exports = {
    getConnection,
    sql
}