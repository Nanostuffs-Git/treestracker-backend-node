const db = require("../models/db");

exports.searchTree = async (req, res) => {
    try {
        const { search } = req.body;

        if (!search) {
            return res.status(400).json({ message: "Search parameter is required." });
        }

        // Fetch matching tree names and IDs from the database
        const result = await db.query(
            `SELECT tree_id, local_name FROM tree_surveys WHERE local_name ILIKE $1 LIMIT 10`,
            [`%${search}%`]
        );

        // Return both `tree_id` and `local_name`
        const trees = result.rows.map(row => ({
            tree_id: row.tree_id,
            local_name: row.local_name,
        }));

        res.status(200).json(trees);
    } catch (error) {
        console.error("Error searching tree names:", error);
        res.status(500).json({
            message: "An error occurred while searching tree names.",
            error,
        });
    }
};
