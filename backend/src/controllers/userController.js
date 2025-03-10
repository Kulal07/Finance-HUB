const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).send('Error creating user: ' + error.message);
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        }

        res.status(200).send('Login successful');
    } catch (error) {
        res.status(400).send('Error logging in: ' + error.message);
    }
};

module.exports = { registerUser, loginUser };
