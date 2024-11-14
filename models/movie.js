const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    genre: { type: [String], required: true },
    release_date: { type: Date, required: true },
    image_url: { type: String },
    actor: { type: [String], required: true },
    director: { type: String, required: true },
    rated: { type: String, required: true },
    trailer_url: {type: String}
});

module.exports = mongoose.model('Movie', movieSchema);
