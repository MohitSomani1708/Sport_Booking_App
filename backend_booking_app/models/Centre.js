const mongoose = require('mongoose');

const centreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sport' }],
    courts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Court' }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Centre', centreSchema);