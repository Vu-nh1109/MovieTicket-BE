const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallController');

// Route tạo phòng chiếu mới
router.post('/', hallController.createHall);

// Route lấy tất cả các phòng chiếu
router.get('/', hallController.getAllHalls);

// Route lấy phòng chiếu theo ID
router.get('/:id', hallController.getHallById);

// Route cập nhật phòng chiếu
router.put('/:id', hallController.updateHall);

// Route xóa phòng chiếu
router.delete('/:id', hallController.deleteHall);

module.exports = router;
