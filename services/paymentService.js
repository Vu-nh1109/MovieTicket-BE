const PaymentModel = require('../models/payment');

// Tạo thanh toán mới
exports.createPayment = async (paymentData) => {
    return await PaymentModel.create(paymentData);
};

// Lấy tất cả các thanh toán
exports.getAllPayments = async () => {
    return await PaymentModel.find();
};

// Lấy thanh toán theo ID
exports.getPaymentById = async (id) => {
    return await PaymentModel.findById(id);
};

// Cập nhật thanh toán theo ID
exports.updatePayment = async (id, paymentData) => {
    return await PaymentModel.findByIdAndUpdate(id, paymentData, { new: true });
};

// Xóa thanh toán theo ID
exports.deletePayment = async (id) => {
    return await PaymentModel.findByIdAndDelete(id);
};
