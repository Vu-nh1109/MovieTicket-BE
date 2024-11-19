const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true }
});

module.exports = mongoose.model('Showtime', showtimeSchema);
