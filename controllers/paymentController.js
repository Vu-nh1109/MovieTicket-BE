const paymentService = require('../services/paymentService');
const CryptoJS = require('crypto-js');

exports.createPayment = async (req, res) => {
    try {
        const payment = await paymentService.createPayment(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: payment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.getAllPayments();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: payments, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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

exports.createZaloPayPayment = async (req, res) => {
    try {
        const { amount, paymentMethod, returnUrl, idcustomer, idshowtime, seatsByType } = req.body;

        // Create payment and ticket
        const paymentData = await paymentService.createZaloPayPayment({
            amount,
            paymentMethod,
            returnUrl,
            idcustomer,
            idshowtime,
            seatsByType
        });

        return res.status(200).json({
            code: 200,
            message: 'Payment created successfully',
            data: paymentData,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: 'Error creating payment: ' + error.message,
        });
    }
};

const config = {
    key2 : "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz"
};

exports.zaloPayCallback = async (req, res) => {
    let result = {};

    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;

        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        console.log('mac =', mac);

        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
            // callback không hợp lệ
            result.return_code = -1;
            result.return_message = 'mac not equal';
        } else {
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng ở đây
            let dataJson = JSON.parse(dataStr, config.key2);
            console.log(dataJson);
            
            await paymentService.updateZaloPaymentStatus(dataJson);

            result.return_code = 1;
            result.return_message = 'success';
        }
    } catch (ex) {
        console.log('lỗi:::' + ex.message);
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = ex.message;
    }

    // thông báo kết quả cho ZaloPay server
    res.json(result);
};
