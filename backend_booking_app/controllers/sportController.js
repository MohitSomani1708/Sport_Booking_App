const Sport = require('../models/Sport');

// Get all sports
exports.getAllSports = async (req, res) => {
    try {
        const sports = await Sport.find();
        res.json(sports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sports' });
    }
};