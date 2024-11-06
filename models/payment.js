const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
    amount: { type: Number, required: true },
    payment_method: { type: String, required: true }, // e.g., Credit Card, PayPal
    payment_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);