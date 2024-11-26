const paymentService = require('../services/paymentService');

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

exports.createPayment = async (req, res) => {
    const { amount, returnUrl, paymentMethod, idshowtimes, idcustomers, seatsByType } = req.body;

    try {
        const showtimeData = await ShowtimeModel.findById(idshowtimes).populate('movie_id hall_id');
        const customerData = await CustomerModel.findById(idcustomers);
        const seats = await SeatModel.find({
            showtime_id: idshowtimes,
            seat_number: { $in: Object.values(seatsByType).flat() }
        });

        if (!showtimeData || !customerData || seats.length === 0) {
            return res.status(400).json({
                code: 400,
                message: 'Invalid data: One or more records not found.'
            });
        }

        const orderInfo = `${showtimeData.movie_id.title}, ${showtimeData.hall_id.name}, ${showtimeData.hall_id.cinema_id.name}, ${customerData.name}, Start: ${showtimeData.start_time}, End: ${showtimeData.end_time}, Seats: ${JSON.stringify(seats.map(seat => seat.seat_number))}`;

        const orderId = `CGV${new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)}`;
        const orderData = {
            requestId: orderId,
            amount,
            orderInfo,
            returnUrl,
        };

        let paymentLink;
        if (paymentMethod === "momo") {
            paymentLink = await paymentService.createPaymentLink(orderData);
        } else {
            return res.status(400).json({
                code: 400,
                message: "Unsupported payment method"
            });
        }

        res.status(200).json({
            code: 200,
            message: 'Payment link created successfully',
            data: {
                orderId,
                payUrl: paymentLink.payUrl,
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            message: `Payment link creation failed: ${err.message}`,
        });
    }
};