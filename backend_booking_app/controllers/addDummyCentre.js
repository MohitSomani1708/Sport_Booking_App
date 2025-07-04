const mongoose = require('mongoose');
const Centre = require('../models/Centre');

// Controller function to add dummy centres
const addDummyCentres = async (req, res) => {
    try {
        // Dummy centre data
        const centres = [
            {
                name: 'Sports Center A',
                sports: [ new mongoose.Types.ObjectId('670fe2b8c2eddb5c30fcd32b'), new mongoose.Types.ObjectId('670fe2e4c2eddb5c30fcd32c')], // Replace these ObjectIds with actual Sport IDs from your database
                courts: [], // Replace these with actual Court IDs
                bookings: [], // Replace with actual Booking IDs
                manager: new mongoose.Types.ObjectId('670fe93a7c2308ad1c0fcef4') // Replace with actual User (Manager) IDs
            },
            {
                name: 'Sports Center B',
                sports: [new mongoose.Types.ObjectId('670fe2f4c2eddb5c30fcd32d'),new mongoose.Types.ObjectId('670fe307c2eddb5c30fcd32e')],
                courts: [],
                bookings: [],
                manager: new mongoose.Types.ObjectId('670fe501282fab1ebe4807a9')
            }
            ,
            {
                name: 'Sports Center C',
                sports: [new mongoose.Types.ObjectId('670fe2e4c2eddb5c30fcd32c'),new mongoose.Types.ObjectId('670fe2f4c2eddb5c30fcd32d'),new mongoose.Types.ObjectId('670fe307c2eddb5c30fcd32e')],
                courts: [],
                bookings: [],
                manager: new mongoose.Types.ObjectId('670fe93a7c2308ad1c0fcef4')
            }
            ,
            {
                name: 'Sports Center D',
                sports: [new mongoose.Types.ObjectId('670fe307c2eddb5c30fcd32e'),new mongoose.Types.ObjectId('670fe2e4c2eddb5c30fcd32c')],
                courts: [],
                bookings: [],
                manager: new mongoose.Types.ObjectId('670fe501282fab1ebe4807a9')
            }
        ];

        // Insert centres into the database
        await Centre.insertMany(centres);
        
        return res.status(200).json({
            message: 'Dummy centres added successfully!',
            data: centres
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error inserting dummy centres',
            error: error.message
        });
    }
};

module.exports = { addDummyCentres };
