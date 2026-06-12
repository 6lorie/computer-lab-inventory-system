const { sql } =
require("../config/db");

async function getAll(
    req,
    res
) {
    try {

        const result =
        await sql.query`
            SELECT * FROM equipment
        `;

        res.json(
            result.recordset
        );

    } catch (err) {

        res.status(500)
        .json({
            message:
            "Error fetching equipment"
        });

    }
}

async function create(
    req,
    res
) {
    try {

        const {
            equipment_code,
            equipment_name,
            category,
            quantity,
            location
        } = req.body;

        await sql.query`
            INSERT INTO equipment
            (equipment_code,
             equipment_name,
             category,
             quantity,
             available,
             location)
            VALUES
            (${equipment_code},
             ${equipment_name},
             ${category},
             ${quantity},
             ${quantity},
             ${location})
        `;

        res.json({
            message:
            "Equipment added"
        });

    } catch (err) {

        res.status(500)
        .json({
            message:
            "Error adding equipment"
        });

    }
}

async function remove(
    req,
    res
) {
    try {

        const {
            id
        } = req.params;

        await sql.query`
            DELETE FROM equipment
            WHERE id=${id}
        `;

        res.json({
            message:
            "Deleted successfully"
        });

    } catch (err) {

        res.status(500)
        .json({
            message:
            "Error deleting"
        });

    }
}

async function update(req, res) {
    try {
        const { id } = req.params;

        const {
            equipment_code,
            equipment_name,
            category,
            quantity,
            location
        } = req.body;

        await sql.query`
            UPDATE equipment
            SET
                equipment_code = ${equipment_code},
                equipment_name = ${equipment_name},
                category = ${category},
                quantity = ${quantity},
                location = ${location},
                available = ${quantity}
            WHERE id = ${id}
        `;

        res.json({
            message: "Updated successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating equipment"
        });
    }
}

module.exports = {
    getAll,
    create,
    remove,
    update
};