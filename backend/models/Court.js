const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport', required: true }
});

module.exports = mongoose.model('Court', courtSchema);
