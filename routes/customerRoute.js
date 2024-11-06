const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Route tạo khách hàng mới
router.post('/', customerController.createCustomer);

// Route lấy tất cả các khách hàng
router.get('/', customerController.getAllCustomers);

// Route lấy khách hàng theo ID
router.get('/:id', customerController.getCustomerById);

// Route cập nhật thông tin khách hàng
router.put('/:id', customerController.updateCustomer);

// Route xóa khách hàng
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
