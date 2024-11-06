const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
    seat_number: { type: String, required: true },
    status: { type: String, default: 'available' } // available, booked, etc.
});

module.exports = mongoose.model('Seat', seatSchema);