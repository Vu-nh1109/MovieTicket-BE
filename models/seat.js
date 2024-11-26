const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    showtime_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seat_number: { type: String, required: true }, // e.g., "A1", "B2"
    type: { type: String, enum: ["normal", "vip", "couple"], required: true }, // Seat type
    status: { type: String, enum: ["booked"], required: true }
});

module.exports = mongoose.model('Seat', seatSchema);
