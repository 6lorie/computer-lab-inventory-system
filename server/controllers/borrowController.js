const { sql } = require("../config/db");

async function borrow(req, res) {
    try {
        const { equipment_id, borrower_name, quantity } = req.body;

        // 1. check available stock
        const eq = await sql.query`
            SELECT available
            FROM equipment
            WHERE id = ${equipment_id}
        `;

        if (!eq.recordset.length) {
            return res.status(404).json({ message: "Equipment not found" });
        }

        const available = eq.recordset[0].available;

        if (available < quantity) {
            return res.status(400).json({
                message: "Not enough available stock",
            });
        }

        // 2. insert borrow record
        await sql.query`
            INSERT INTO borrow_records
            (equipment_id, borrower_name, quantity)
            VALUES
            (${equipment_id}, ${borrower_name}, ${quantity})
        `;

        // 3. update equipment stock
        await sql.query`
            UPDATE equipment
            SET available = available - ${quantity}
            WHERE id = ${equipment_id}
        `;

        res.json({ message: "Borrow successful" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Borrow failed" });
    }
}

module.exports = { borrow };