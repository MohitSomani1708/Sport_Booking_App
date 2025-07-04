const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
    sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport', required: true },
    centre: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true }
});

module.exports = mongoose.model('Court', courtSchema);