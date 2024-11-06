const paymentService = require('../services/paymentService');

// Tạo thanh toán mới
exports.createPayment = async (req, res) => {
    try {
        const payment = await paymentService.createPayment(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: payment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách tất cả các thanh toán
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.getAllPayments();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: payments, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy thanh toán theo ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: payment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật thông tin thanh toán
exports.updatePayment = async (req, res) => {
    try {
        const payment = await paymentService.updatePayment(req.params.id, req.body);
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: payment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa thanh toán
exports.deletePayment = async (req, res) => {
    try {
        const payment = await paymentService.deletePayment(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: payment, status: "deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
