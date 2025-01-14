const db = require("../models/db");

exports.getQrCodes = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }

    try {
        const query = `
            SELECT 
                qc.qrcode_id,
                qc.tree_id,
                qc.user_id,
                u.firstname,
                u.lastname,
                ts.latitude,
                ts.longitude,
                ts.photo_url,
                ts.plantation_type,
                ts.scientific_name,
                ts.local_name,
                ts.tree_condition,
                ts.plant_type,
                ts.remarks
            FROM qr_codes qc
            JOIN users u ON qc.user_id = u.user_id
            LEFT JOIN tree_surveys ts ON qc.tree_id = ts.tree_id
            WHERE u.username = $1;
        `;
        const values = [username];
        const result = await db.query(query, values);

        if (result?.rows?.length === 0) {
            return res.status(404).json({ message: 'No QR codes found for this user.' });
        }

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching QR codes:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
