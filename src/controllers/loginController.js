const db = require("../models/db");

exports.login = async (req, res) => {
    const { username, password, mobileNo } = req.body;

    if (!mobileNo && (!username || !password)) {
        return res.status(400).json({ message: 'Invalid login details. Please provide valid credentials.' });
    }

    try {
        let query, values;

        if (mobileNo) {
            query = "SELECT * FROM users WHERE mobile_no = $1";
            values = [mobileNo];
        } else {
            query = "SELECT * FROM users WHERE username = $1";
            values = [username];
        }

        const result = await db.query(query, values);
        const user = result?.rows[0];

        if (result?.rows?.length === 0) {
            if (mobileNo) {
                return res.status(401).json({ message: 'Mobile number not found.' });
            } else {
                return res.status(401).json({ message: 'Username not found.' });
            }
        }

        if (!mobileNo && password !== user.password_hash) {
            return res.status(401).json({ message: 'Invalid username or password. Please try again.' });
        }

        const userData = {
            id: user.user_id,
            username: user.username,
            mobileNo: user.mobile_no,
            email: user.email,
            firstname: user?.firstname,
            lastname: user?.lastname,
        };

        return res.status(200).json({
            success: true,
            user: userData,
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'An error occurred during login. Please try again later.' });
    }
};
