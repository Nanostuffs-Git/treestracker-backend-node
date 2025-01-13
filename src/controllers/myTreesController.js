const db = require("../models/db");

exports.getTreeByUsername = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }

    try {
        const query = `
      SELECT ts.*, qc.qrcode_id
      FROM tree_surveys ts
      JOIN qr_codes qc ON ts.tree_id = qc.tree_id
      JOIN users u ON qc.user_id = u.user_id
      WHERE u.username = $1
    `;
        const values = [username];
        const result = await db.query(query, values);

        if (result?.rows?.length === 0) {
            return res.status(404).json({ message: 'No tree surveys found for this user with a QR code attached.' });
        }

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching tree surveys:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
