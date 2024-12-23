const PaymentModel = require('../models/payment');
const CustomerModel = require('../models/customer');
const ShowtimeModel = require('../models/showtime');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const TicketModel = require('../models/ticket');
const SeatModel = require('../models/seat');
const moment = require('moment');


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

const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

// Create Payment and Ticket
exports.createZaloPayPayment = async (paymentDetails) => {
    const { amount, paymentMethod, returnUrl, idcustomer, idshowtime, seatsByType } = paymentDetails;

    // Check if customer exists
    const existingCustomer = await CustomerModel.findById(idcustomer);
    if (!existingCustomer) {
        throw new Error('Customer does not exist');
    }

    // Check if showtime exists
    const existingShowtime = await ShowtimeModel.findById(idshowtime);
    if (!existingShowtime) {
        throw new Error('Showtime does not exist');
    }

    const reqtime = moment().utcOffset(7).format('YYMMDDHHmmss');
    const orderId = `${moment().utcOffset(7).format('YYMMDD')}_CGV${reqtime}`; // Format orderId like YYMMDD_CGV<timestamp><customer_id> must be <40 characters

    const embed_data = {
        //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
        redirecturl: returnUrl
    };
    const items = [];
    for (const [seatType, seatList] of Object.entries(seatsByType)) {
        for (const seat of seatList) {
            items.push({
                seatType,
                seatNumber: seat,
                showtime: idshowtime
            });
        }
    }

    const order = {
        app_id: config.app_id,
        app_trans_id: `${orderId}`, // Must be unique for each transaction
        app_user: idcustomer,
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: amount,
        //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
        //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
        callback_url: 'https://movie-ticket-be.vercel.app/payments/zalopay-callback',
        description: `CGV - Payment for the order #${orderId}`,
        bank_code: '',
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
        config.app_id +
        '|' +
        order.app_trans_id +
        '|' +
        order.app_user +
        '|' +
        order.amount +
        '|' +
        order.app_time +
        '|' +
        order.embed_data +
        '|' +
        order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
        const result = await axios.post(config.endpoint, null, { params: order });

        // Create a new payment record with status 'pending'
        const payment = new PaymentModel({
            amount,
            payment_method: paymentMethod,
            payment_status: 'pending', // Set initial payment status to pending
            ticket_id: null, // This will be updated after ticket creation
            orderId: orderId // Save the order ID
        });
        await payment.save();

        return {
            payUrl: result.data.order_url,
            orderId
        };
    } catch (error) {
        throw new Error("Error with ZaloPay API: " + error.message);
    }
};

exports.updateZaloPaymentStatus = async (callBackData) => {
    const { app_trans_id, app_user, item } = callBackData;

    // Update payment status to 'completed'
    const payment = await PaymentModel.findOneAndUpdate(
        { orderId: app_trans_id },
        { payment_status: 'completed' },
        { new: true }
    );

    if (!payment) {
        throw new Error('Payment not found');
    }

    // Create a new ticket
    const seatIds = [];
    const items = JSON.parse(item);
    for (const seat of items) {
        let newSeat = {
            seatType: seat.seatType,
            seatNumber: seat.seatNumber
        };
        seatIds.push(newSeat);
    }

    const ticket = new TicketModel({
        customer_id: app_user,
        showtime_id: items[0].showtime,
        seat_ids: seatIds,
        price: payment.amount
    });

    await ticket.save();

    // Update the payment record with the ticket ID
    payment.ticket_id = ticket._id;
    await payment.save();

    // Create new seats that have been booked
    const seatPromises = items.map(async (seat) => {
        const newSeat = new SeatModel({
            type: seat.seatType.toLowerCase(),
            seat_number: seat.seatNumber,
            showtime_id: seat.showtime
        });
        await newSeat.save();
    });

    await Promise.all(seatPromises);
}