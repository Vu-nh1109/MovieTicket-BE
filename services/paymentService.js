const PaymentModel = require('../models/payment');
const axios = require('axios');
const crypto = require('crypto');

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

const MomoAPI = {
    partnerCode: 'MOMO',
    accessKey: 'F8BBA842ECF85',
    secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz'
};

function generateSignature(orderData) {
    const rawSignature = `partnerCode=${MomoAPI.partnerCode}&accessKey=${MomoAPI.accessKey}&requestId=${orderData.requestId}&amount=${orderData.amount}&orderId=${orderData.orderId}&orderInfo=${orderData.orderInfo}&returnUrl=${MomoAPI.returnUrl}`;
    return crypto.createHmac('sha256', MomoAPI.secretKey).update(rawSignature).digest('hex');
}

exports.createPaymentLink = async (orderData) => {
    try {
        const momoData = {
            partnerCode: 'MOMO_PARTNER_CODE',
            accessKey: 'MOMO_ACCESS_KEY',
            requestId: orderData.orderId,
            amount: orderData.amount,
            orderInfo: orderData.orderInfo,
            returnUrl: orderData.returnUrl,
            notifyUrl: 'Example_URL',
            signature: generateSignature(orderData),
        };

        const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', momoData);
        return response.data;
    } catch (error) {
        throw new Error('Payment link creation failed');
    }
};