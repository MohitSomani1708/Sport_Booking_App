const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Get bookings for a specific centre, sport, and date
router.get('/', async (req, res) => {
  const { centre, sport, date } = req.query;
  try {
    const bookings = await Booking.find({ centre, sport, date });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Create a new booking
router.post('/', async (req, res) => {
    console.log("Received Booking Request (POST):", req.body);  // Log to verify centre is included
    const { centre, sport, court, timeSlot, user, status, date } = req.body;
  
    try {
      const newBooking = new Booking({ centre, sport, court, timeSlot, user, status, date });
      const savedBooking = await newBooking.save();  // Save the booking
      console.log("Saved booking in database:", savedBooking);  // Log saved booking
      res.status(201).json(savedBooking);  // Return saved booking
    } catch (err) {
      console.error('Error saving booking:', err);
      res.status(500).json({ error: err.message });
    }
  });
  
  
  

// Make a slot available again (delete the booking)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking removed and slot is now available." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
