const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Route for fetching now-showing movies
router.get('/nowshowing', movieController.getMoviesNowShowing);

module.exports = router;