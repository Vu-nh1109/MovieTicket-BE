const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route tạo thanh toán mới
router.post('/', paymentController.createPayment);

// Route lấy tất cả các thanh toán
router.get('/', paymentController.getAllPayments);

// Route lấy thanh toán theo ID
router.get('/:id', paymentController.getPaymentById);

// Route cập nhật thông tin thanh toán
router.put('/:id', paymentController.updatePayment);

// Route xóa thanh toán
router.delete('/:id', paymentController.deletePayment);

router.post('/momo', paymentController.createPayment);

module.exports = router;
