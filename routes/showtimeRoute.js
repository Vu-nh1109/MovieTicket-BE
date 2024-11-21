const express = require('express');
const router = express.Router();
const showtimeController = require('../controllers/showtimeController');


// Route tạo suất chiếu mới
router.post('/', showtimeController.createShowtime);

// Route lấy tất cả các suất chiếu
//router.get('/', showtimeController.getAllShowtimes);

// Route lấy suất chiếu theo ID
router.get('/:id', showtimeController.getShowtimeById);

// Route cập nhật suất chiếu
router.put('/:id', showtimeController.updateShowtime);

// Route xóa suất chiếu
router.delete('/:id', showtimeController.deleteShowtime);

router.get('/', showtimeController.getMovieShowtimes);

// Route lấy seat status
router.get('/:id/seatstatus', showtimeController.getSeatStatus);

module.exports = router;
