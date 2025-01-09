const db = require("../models/db");

exports.getTreeByUsername = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }

    try {
        const query = `
      SELECT ts.* 
      FROM tree_surveys ts
      JOIN users u ON ts.created_by = u.user_id
      WHERE u.username = $1
    `;
        const values = [username];
        const result = await db.query(query, values);

        if (result?.rows?.length === 0) {
            return res.status(404).json({ message: 'No tree surveys found for this user.' });
        }

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching tree surveys:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};