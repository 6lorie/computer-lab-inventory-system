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

async function getBorrowRecords(req, res) {
    try {
        const result = await sql.query`
            SELECT 
                br.id,
                br.borrower_name,
                br.quantity,
                br.borrowed_date,
                br.returned_date,
                br.status,
                e.equipment_name,
                e.equipment_code
            FROM borrow_records br
            JOIN equipment e ON br.equipment_id = e.id
            ORDER BY br.borrowed_date DESC
        `;

        res.json(result.recordset);

    } catch (err) {
        res.status(500).json({
            message: "Error fetching borrow records",
        });
    }
}

async function returnBorrow(req, res) {
    try {
        const { borrow_id } = req.body;

        // 1. get borrow record
        const borrow = await sql.query`
            SELECT * 
            FROM borrow_records
            WHERE id = ${borrow_id}
        `;

        if (!borrow.recordset.length) {
            return res.status(404).json({
                message: "Borrow record not found",
            });
        }

        const record = borrow.recordset[0];

        // 2. prevent double return
        if (record.status === "Returned") {
            return res.status(400).json({
                message: "Already returned",
            });
        }

        // 3. update borrow record
        await sql.query`
            UPDATE borrow_records
            SET status = 'Returned',
                returned_date = GETDATE()
            WHERE id = ${borrow_id}
        `;

        // 4. restore equipment stock
        await sql.query`
            UPDATE equipment
            SET available = available + ${record.quantity}
            WHERE id = ${record.equipment_id}
        `;

        res.json({ message: "Return successful" });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Return failed",
        });
    }
}

module.exports = { borrow, getBorrowRecords, returnBorrow };