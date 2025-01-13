const db = require("../models/db");

exports.createQRCodeRecords = async (req, res) => {
    try {
        const { count, user_id } = req.body;

        if (!count || !user_id) {
            return res.status(400).json({ message: "Count and user_id are required." });
        }

        // Fetch the last QR code ID from the database
        const result = await db.query(
            `SELECT qrcode_id FROM qr_codes ORDER BY qrcode_id DESC LIMIT 1`
        );
        const lastQRCode = result.rows[0];

        // Determine the starting number for new QR codes
        let nextNumber = lastQRCode
            ? parseInt(lastQRCode.qrcode_id.replace("qr", ""), 10) + 1
            : 1;

        // Generate the QR codes
        const qrCodes = [];
        for (let i = 0; i < count; i++) {
            const qrcode_id = `qr${String(nextNumber).padStart(4, "0")}`;
            qrCodes.push({ qrcode_id, tree_id: null, user_id });
            nextNumber++;
        }

        // Insert into the database
        const values = qrCodes.map(
            ({ qrcode_id, tree_id, user_id }) =>
                `('${qrcode_id}', ${tree_id}, ${user_id})`
        );
        const insertQuery = `
      INSERT INTO qr_codes (qrcode_id, tree_id, user_id)
      VALUES ${values.join(", ")}
    `;
        await db.query(insertQuery);

        res.status(201).json({ message: `${count} QR codes created successfully.` });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred while creating records.", error });
    }
};
