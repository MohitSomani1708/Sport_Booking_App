const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    centre: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
    sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport', required: true },
    court: { type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slot_time: { type: String, required: true }, // Time slot
    slot_date: { type: Date, required: true } // Date
    // Create a new enum field named "booking_status" with possible fields ["confirmed","waitlisted","cancelled"]
});

module.exports = mongoose.model('Booking', bookingSchema);
