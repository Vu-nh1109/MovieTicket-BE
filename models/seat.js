const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
    showtime_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seat_number: { type: String, required: true }, // e.g., "A1", "B2"
    status: { type: String, enum: ["available", "booked"], required: true }
});

module.exports = mongoose.model('Seat', seatSchema);
