const mongoose = require('mongoose');
const User = require('../models/User');

// Controller function to add dummy users
const addDummyUsers = async (req, res) => {
    try {
        // Dummy users
        const users = [
            {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                role: 'manager'
            },
            {
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: 'password123',
                role: 'customer'
            },
            {
                name: 'Mike Johnson',
                email: 'mike.johnson@example.com',
                password: 'password123',
                role: 'customer'
            }
        ];

        // Insert users into the database
        await User.insertMany(users);
        
        return res.status(200).json({
            message: 'Dummy users added successfully!',
            data: users
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'Error inserting dummy users',
            error: error.message
        });
    }
};

module.exports = { addDummyUsers };
