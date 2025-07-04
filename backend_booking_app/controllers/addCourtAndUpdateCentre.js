const mongoose = require('mongoose');
const Court = require('../models/Court')
const Centre = require('../models/Centre');

// Controller function to add a court and update the corresponding centre
const addCourtAndUpdateCentre = async (req, res) => {
    const { sport, centre } = req.body; // Expecting sport and centre IDs from the request body

    try {
        // Create a new court document
        let newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670feeafcceb13245b68a163'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670fe2b8c2eddb5c30fcd32b') // Convert centre ID to ObjectId
        });

        // Save the new court to the database
        let savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );

        newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670feeafcceb13245b68a163'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670fe2b8c2eddb5c30fcd32b') // Convert centre ID to ObjectId
        });
        savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );
        newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670fe2e4c2eddb5c30fcd32c'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670fe2b8c2eddb5c30fcd32b') // Convert centre ID to ObjectId
        });
        savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );
        newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670fe2b8c2eddb5c30fcd32b'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670feeafcceb13245b68a164') // Convert centre ID to ObjectId
        });
        savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );
        newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670fe2f4c2eddb5c30fcd32d'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670feeafcceb13245b68a164') // Convert centre ID to ObjectId
        });
        savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );
        newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670fe2f4c2eddb5c30fcd32d'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670feeafcceb13245b68a164') // Convert centre ID to ObjectId
        });
        savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );
        newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670fe2f4c2eddb5c30fcd32d'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670feeafcceb13245b68a164') // Convert centre ID to ObjectId
        });
        savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );
        newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670fe2e4c2eddb5c30fcd32c'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670feeafcceb13245b68a165') // Convert centre ID to ObjectId
        });
        savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );
        newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670fe2f4c2eddb5c30fcd32d'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670feeafcceb13245b68a165') // Convert centre ID to ObjectId
        });
        savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );
        newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670fe307c2eddb5c30fcd32e'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670feeafcceb13245b68a165') // Convert centre ID to ObjectId
        });
        savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );
        newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670fe307c2eddb5c30fcd32e'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670feeafcceb13245b68a166') // Convert centre ID to ObjectId
        });
        savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );
        newCourt = new Court({
            sport: new mongoose.Types.ObjectId('670fe2e4c2eddb5c30fcd32c'), // Convert sport ID to ObjectId
            centre: new mongoose.Types.ObjectId('670feeafcceb13245b68a166') // Convert centre ID to ObjectId
        });
        savedCourt = await newCourt.save();

        // Update the corresponding Centre to include this new court's ID
        await Centre.findByIdAndUpdate(
            savedCourt.centre,
            { $push: { courts: savedCourt._id } }, // Push the new court's ID into the 'courts' array
            { new: true, useFindAndModify: false } // Return the updated document
        );

        return res.status(200).json({
            message: 'Court added and Centre updated successfully!',
            data: savedCourt
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'Error adding court and updating centre',
            error: error.message
        });
    }
};

module.exports = { addCourtAndUpdateCentre };
