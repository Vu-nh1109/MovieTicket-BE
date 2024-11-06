const express = require('express');
const router = express.Router();
const cinemaController = require('../controllers/cinemaController');

// Route tạo rạp chiếu phim mới
router.post('/', cinemaController.createCinema);

// Route lấy tất cả các rạp chiếu phim
router.get('/', cinemaController.getAllCinemas);

// Route lấy rạp chiếu phim theo ID
router.get('/:id', cinemaController.getCinemaById);

// Route cập nhật rạp chiếu phim
router.put('/:id', cinemaController.updateCinema);

// Route xóa rạp chiếu phim
router.delete('/:id', cinemaController.deleteCinema);

module.exports = router;
