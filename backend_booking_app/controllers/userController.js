const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(name, email, password, role);
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists.' });

        user = new User({ name, email, password, role });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token , name });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log(email, password);
        if (!user)  {
            console.log("hello");
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("hello1");
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        return res.status(200).json({ token: token, name: user.name });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};
