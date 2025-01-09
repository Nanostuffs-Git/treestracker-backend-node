const db = require("../models/db");

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const query = "SELECT * FROM users WHERE username = $1";
        const values = [username];
        const result = await db.query(query, values);
        const user = result?.rows[0];

        if (result?.rows?.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }
        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        // Directly compare the provided password with the stored password
        if (password !== user.password_hash) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const userData = {
            id: user.user_id,
            username: user.username,
            mobileNo: user.mobile_no,
            email: user.email,
        };

        // Send success response
        return res.status(200).json({
            success: true,
            user: userData,
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'An error occurred during login.' });
    }
};