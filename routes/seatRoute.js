const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

// Route tạo ghế mới
router.post('/', seatController.createSeat);

// Route lấy tất cả các ghế
router.get('/', seatController.getAllSeats);

// Route lấy ghế theo ID
router.get('/:id', seatController.getSeatById);

// Route cập nhật thông tin ghế
router.put('/:id', seatController.updateSeat);

// Route xóa ghế
router.delete('/:id', seatController.deleteSeat);

// Route lấy seat status
router.get('/seatstatus', seatController.getSeatStatus);

module.exports = router;
