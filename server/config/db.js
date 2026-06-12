require("dotenv").config();

const sql =
require("mssql/msnodesqlv8");

const config = {
    connectionString:
        `Driver={${process.env.DB_DRIVER}};` +
        `Server=${process.env.DB_SERVER};` +
        `Database=${process.env.DB_NAME};` +
        `Trusted_Connection=${process.env.DB_TRUSTED};` +
        `Encrypt=${process.env.DB_ENCRYPT};` +
        `TrustServerCertificate=${process.env.DB_CERT};`
};

async function connectDB() {
    try {
        await sql.connect(config);

        console.log(
            "Connected to Database"
        );

    } catch (err) {
        console.log("DB ERROR:", err);
    }
}

module.exports = {
    sql,
    connectDB
};