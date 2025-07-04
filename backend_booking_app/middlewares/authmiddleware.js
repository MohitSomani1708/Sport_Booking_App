const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // console.log(req.header);
    const token = req.header('Authorization').replace("Bearer ","");
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
        req.user = await User.findById(decoded.id);
        // console.log(req.user)
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
