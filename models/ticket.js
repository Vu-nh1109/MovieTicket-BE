const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    showtime_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seat_ids: [{
        seatType: { type: String, required: true },
        seatNumber: { type: String, required: true }
    }],
    price: { type: Number, required: true },
    booking_date: { type: Date, default: Date.now }
});

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
//module.exports = mongoose.model('Ticket', ticketSchema);