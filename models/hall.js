const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    cinema_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
    name: { type: String, required: true },
    seats: { type: Number, required: true }
});

module.exports = mongoose.model('Hall', hallSchema);
