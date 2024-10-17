const Booking = require('../models/Booking');
const Court = require('../models/Court');

// Get bookings by sport and date
exports.getBookings = async (req, res) => {
  try {
    const { sport_id, date } = req.query;
    const bookings = await Booking.find({
      time_slot: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
      }
    }).populate('court');

    // Filter by sport
    const filteredBookings = bookings.filter(booking => booking.court.sport.toString() === sport_id);
    res.status(200).json(filteredBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { court_id, time_slot, booked_by } = req.body;

    const existingBooking = await Booking.findOne({ court: court_id, time_slot });

    if (existingBooking) {
      return res.status(400).json({ message: "This court is already booked for the selected time slot." });
    }

    const newBooking = new Booking({
      court: court_id,
      time_slot,
      booked_by
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
