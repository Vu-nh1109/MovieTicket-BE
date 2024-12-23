const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
    amount: { type: Number, required: true },
    payment_method: { type: String, required: true }, // e.g., Credit Card, PayPal
    payment_date: { type: Date, default: Date.now },
    payment_status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }, // Track payment status
    orderId: { type: String, required: true },
});

module.exports = mongoose.model('Payment', paymentSchema);