require('dotenv').config();
const express = require('express');
const connectdB = require('./db/connection');
const authMiddleware = require('./middlewares/authmiddleware');
const userRoutes = require('./routes/userRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const sportRoutes = require('./routes/sportRoutes.js')
const centreRoutes = require('./routes/centreRoutes.js')
const bookingRoutes = require('./routes/bookingRoutes.js')

const app = express();
const cors = require('cors');
app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


// Middleware
app.use(express.json()); // Body parser
// Protected routes - These routes are behind the auth middleware
app.use('/api/v1', authMiddleware, protectedRoutes);
// Routes
app.use('/api/users', userRoutes); // Public routes like login, signup
app.use('/api/sports', sportRoutes)
app.use('/api/centres', centreRoutes)
app.use('/api/bookings', bookingRoutes)
// app.use('/api/booking', bookingRoutes)


const port = process.env.PORT;
const start = async () => {
    try {
        await connectdB(process.env.MONGO_URI);
        console.log('Connected to DB...');
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
