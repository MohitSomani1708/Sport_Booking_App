const { default: mongoose } = require('mongoose');
const Booking = require('../models/Booking');
const Centre = require('../models/Centre');
const User = require('../models/User');

// Create a booking (no change)
exports.createBooking = async (req, res) => {
    console.log(`someone is trying to book`);
    const { centre_id, sport_id, court_id, slot_time, slot_date } = req.body;
    try {
        const existingBooking = await Booking.findOne({
            court: court_id,
            slot_date,
            slot_time
        });

        if (existingBooking) {
            // If a booking already exists, rather than sending back the error, we create the booking with
            // waitlisted status, this helps us keep track of all bookings (confirmed or not)
            return res.status(400).json({ message: 'Slot already booked' });
        }

        console.log(req.user._id)
        const booking = new Booking({
            centre: centre_id,
            sport: sport_id,
            court: court_id,
            createdBy: req.user._id,
            slot_time,
            slot_date
        });

        await booking.save();
        await Centre.findByIdAndUpdate(centre_id, { $push: { bookings: booking._id } });

        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

// Get all bookings for a normal user
exports.getUserBookings = async (req, res) => {
    try {
        console.log(req.user)
        if(req.user.role=='manager'){
            return this.getManagerBookings(req,res)
        }
        const bookings = await Booking.find({ createdBy: req.user._id }).populate('centre sport court');
        res.json(bookings);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

// Get all bookings for a centre manager
exports.getManagerBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get centres managed by the current manager
        const centresManaged = await Centre.find({ manager: userId }).select('_id');

        // Extract centre IDs
        const centreIds = centresManaged.map(centre => centre._id);

        // Find all bookings for the centres managed by this user
        const bookings = await Booking.find({
            centre: { $in: centreIds }
        }).populate('centre sport court createdBy');

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching centre bookings' });
    }
};

// Cancel a booking (no change)
exports.cancelBooking = async (req, res) => {
    const { booking_id } = req.params;

    try {
        const booking = await Booking.findById(booking_id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // Only the user who created the booking can cancel it
        if (booking.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        await booking.deleteOne({_id:new mongoose.Types.ObjectId('671005196e4fdf018f3a21ac')});
        // When a booking is cancelled, we can search the bookings with specifications 
        // (waitlisted, same slot_time, same slot_date) and confirm their booking, 
        // and send the customer a notification
        res.json({ message: 'Booking cancelled' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error cancelling booking' });
    }
};



{
    waitlistId
    booking_id-->cancel-->searchfor waitlist ids -->createbooking(id_)

}

exports.getBookingsByCentreAndSport = async (req, res) => {
    const { centre_id, sport_id, slot_date } = req.body; // Assuming these are passed as URL parameters
    console.log('hello11');
    console.log(centre_id, sport_id, slot_date);
    try {
        // Find all bookings that match the specified centre and sport
        const bookings = await Booking.find({
            centre: centre_id,
            sport: sport_id,
            slot_date : slot_date
        }).populate('court createdBy');
        // if (bookings.length === 0) {
        //     return res.status(404).json({ message: 'No bookings found for this sport in the specified centre' });
        // }
        res.status(200).json({bookings});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching bookings for the centre and sport' });
    }
};