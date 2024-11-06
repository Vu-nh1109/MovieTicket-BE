const HallModel = require('../models/hall');

// Tạo phòng chiếu mới
exports.createHall = async (hallData) => {
    return await HallModel.create(hallData);
};

// Lấy tất cả các phòng chiếu
exports.getAllHalls = async () => {
    return await HallModel.find().populate('cinema_id'); // Lấy thêm thông tin rạp chiếu
};

// Lấy phòng chiếu theo ID
exports.getHallById = async (id) => {
    return await HallModel.findById(id).populate('cinema_id');
};

// Cập nhật phòng chiếu theo ID
exports.updateHall = async (id, hallData) => {
    return await HallModel.findByIdAndUpdate(id, hallData, { new: true });
};

// Xóa phòng chiếu theo ID
exports.deleteHall = async (id) => {
    return await HallModel.findByIdAndDelete(id);
};
