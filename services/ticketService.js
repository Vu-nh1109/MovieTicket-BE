const TicketModel = require('../models/ticket');

// Tạo vé mới
exports.createTicket = async (ticketData) => {
    return await TicketModel.create(ticketData);
};

// Lấy tất cả các vé
exports.getAllTickets = async () => {
    return await TicketModel.find()
        .populate('customer_id')
        .populate('showtime_id')
        .populate('seat_id'); // Lấy thêm thông tin về khách hàng, suất chiếu, và ghế
};

// Lấy vé theo ID
exports.getTicketById = async (id) => {
    return await TicketModel.findById(id)
        .populate('customer_id')
        .populate('showtime_id')
        .populate('seat_id');
};

// Cập nhật vé theo ID
exports.updateTicket = async (id, ticketData) => {
    return await TicketModel.findByIdAndUpdate(id, ticketData, { new: true });
};

// Cập nhật trạng thái thanh toán
exports.updatePaymentStatus = async (id, payment_status) => {
    return await TicketModel.findByIdAndUpdate(id, { payment_status }, { new: true });
};

// Xóa vé theo ID
exports.deleteTicket = async (id) => {
    return await TicketModel.findByIdAndDelete(id);
};
