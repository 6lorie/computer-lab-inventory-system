const { sql } = require("../config/db");

async function login(req, res) {
    try {

        const {username, password,} = req.body;

        const result = await sql.query`SELECT * FROM users WHERE 
                    username=${username} AND password=${password}`;

        if (result.recordset.length === 0) {
            return res.status(401).json({
                    message:"Invalid username or password",
                });
        }

        const user = result.recordset[0];

        res.json({
            message:"Login successful",

            user: {
                id: user.id,
                username:
                    user.username,

                role:
                    user.role,
            },
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
                message:"Server error",
            });
    }
}

module.exports = {login,};