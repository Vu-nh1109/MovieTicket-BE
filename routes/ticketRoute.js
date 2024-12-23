const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Route tạo vé mới
router.post('/', ticketController.createTicket);

// Route lấy tất cả các vé
router.get('/', ticketController.getAllTickets);

// Route lấy vé theo customerId
router.get('/customer/:customerId', ticketController.getTicketByCustomerId);

// Route lấy vé theo ID
router.get('/:id', ticketController.getTicketById);

// Route cập nhật thông tin vé
router.put('/:id', ticketController.updateTicket);

// Route cập nhật trạng thái thanh toán của vé
router.patch('/:id/payment-status', ticketController.updatePaymentStatus);

// Route xóa vé
router.delete('/:id', ticketController.deleteTicket);



module.exports = router;
