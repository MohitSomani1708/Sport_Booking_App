const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the auth routes

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://somanimohit2020:Target2020@cluster0.sjhe5.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes); 

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

