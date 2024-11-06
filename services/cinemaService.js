const CinemaModel = require('../models/cinema');

// Thêm rạp chiếu phim mới
exports.createCinema = async (cinemaData) => {
    return await CinemaModel.create(cinemaData);
};

// Lấy tất cả rạp chiếu phim
exports.getAllCinemas = async () => {
    return await CinemaModel.find();
};

// Lấy rạp chiếu phim theo ID
exports.getCinemaById = async (id) => {
    return await CinemaModel.findById(id);
};

// Cập nhật rạp chiếu phim theo ID
exports.updateCinema = async (id, cinemaData) => {
    return await CinemaModel.findByIdAndUpdate(id, cinemaData, { new: true });
};

// Xóa rạp chiếu phim theo ID
exports.deleteCinema = async (id) => {
    return await CinemaModel.findByIdAndDelete(id);
};
