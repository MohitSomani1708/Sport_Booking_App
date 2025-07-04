const express = require('express');
const {
    createBooking,
    getUserBookings,
    getManagerBookings,
    cancelBooking,
    getBookingsByCentreAndSport
} = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authmiddleware');
// const managerMiddleware = require('../middlewares/managerMiddleware'); // Optional middleware for manager roles
const router = express.Router();

// Route to create a booking (for both customers and managers)
router.post('/', authMiddleware, createBooking);

// Route for normal users to view their own bookings
router.get('/my-bookings', authMiddleware, getUserBookings);

// Route for centre managers to view all bookings for their centres
router.get('/centre-bookings', authMiddleware, getManagerBookings);

// Route to cancel a booking (for both customers and managers)
router.delete('/:booking_id', authMiddleware, cancelBooking);
router.post('/sports-centre-date', authMiddleware, getBookingsByCentreAndSport);

module.exports = router;