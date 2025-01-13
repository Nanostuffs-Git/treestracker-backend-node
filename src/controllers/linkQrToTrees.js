const db = require("../models/db");

exports.linkTreeToQRCode = async (req, res) => {
    try {
        const { qrCodeId, treeId } = req.body;

        if (!qrCodeId || !treeId) {
            return res.status(400).json({ message: "QR Code ID and Tree ID are required." });
        }

        // Check if the QR code exists
        const result = await db.query(
            `SELECT * FROM qr_codes WHERE qrcode_id = $1`,
            [qrCodeId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "QR Code not found." });
        }

        await db.query(
            `UPDATE qr_codes SET tree_id = $1 WHERE qrcode_id = $2`,
            [treeId, qrCodeId]
        );

        res.status(200).json({ message: "Tree linked successfully." });
    } catch (error) {
        console.error("Error linking tree to QR code:", error);
        res.status(500).json({ message: "An error occurred while linking tree to QR code.", error });
    }
};
