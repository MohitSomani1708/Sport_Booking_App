const Centre = require('../models/Centre');
const Sport = require('../models/Sport');

// Get all centres
exports.getAllCentres = async (req, res) => {
    try {
        // console.log('requesting all centres');
        const centres = await Centre.find().populate('sports courts manager');
        console.log(centres);
        res.status(200).json({centres});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching centres' });
    }
};

// Get centres that have a specific sport
exports.getCentresBySport = async (req, res) => {
    let {sportsName} = req.params;
    sportsName = sportsName.charAt(0).toUpperCase() + sportsName.slice(1);
    // console.log(req.params);
    // console.log(sportsName);
    const {_id} = await Sport.findOne({name : sportsName});
    try {
        const centres = await Centre.find({ sports: _id}).populate('sports courts');
        if (!centres) return res.status(404).json({ message: 'No centres found for the sport' });
        res.status(200).json({centres});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching centres' });
    }
};