const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  centre: { type: String, required: true }, 
  sport: { type: String, required: true },
  court: { type: String, required: true },
  timeSlot: { type: String, required: true },
  user: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
