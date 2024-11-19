const SeatModel = require('../models/seat');

// Tạo ghế mới
exports.createSeat = async (seatData) => {
    return await SeatModel.create(seatData);
};

// Lấy tất cả các ghế
exports.getAllSeats = async () => {
    return await SeatModel.find().populate('hall_id'); // Lấy thêm thông tin về phòng chiếu
};

// Lấy ghế theo ID
exports.getSeatById = async (id) => {
    return await SeatModel.findById(id).populate('hall_id');
};

// Cập nhật ghế theo ID
exports.updateSeat = async (id, seatData) => {
    return await SeatModel.findByIdAndUpdate(id, seatData, { new: true });
};

// Cập nhật trạng thái ghế
exports.updateSeatStatus = async (id, status) => {
    return await SeatModel.findByIdAndUpdate(id, { status }, { new: true });
};

// Xóa ghế theo ID
exports.deleteSeat = async (id) => {
    return await SeatModel.findByIdAndDelete(id);
};

exports.getSeatStatus = async (idshowtimes) => {
    // Fetch booked seats for the given showtime
    const seats = await SeatModel.find({ 
        showtime_id: idshowtimes, 
        status: "booked" 
    });

    // Extract seat numbers
    const bookedSeats = seats.map(seat => seat.seat_number);

    return { idshowtimes, bookedSeats };
};