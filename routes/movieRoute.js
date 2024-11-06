const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Route tạo phim mới
router.post('/', movieController.createMovie);

// Route lấy tất cả các phim
router.get('/', movieController.getAllMovies);

// Route lấy phim theo ID
router.get('/:id', movieController.getMovieById);

// Route cập nhật phim
router.put('/:id', movieController.updateMovie);

// Route xóa phim
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
