const ShowtimeModel = require('../models/showtime');

// Tạo suất chiếu mới
exports.createShowtime = async (showtimeData) => {
    return await ShowtimeModel.create(showtimeData);
};

// Lấy tất cả các suất chiếu
exports.getAllShowtimes = async () => {
    return await ShowtimeModel.find().populate('movie_id').populate('hall_id'); // Lấy thêm thông tin về phim và phòng chiếu
};

// Lấy suất chiếu theo ID
exports.getShowtimeById = async (id) => {
    return await ShowtimeModel.findById(id).populate('movie_id').populate('hall_id');
};

// Cập nhật suất chiếu theo ID
exports.updateShowtime = async (id, showtimeData) => {
    return await ShowtimeModel.findByIdAndUpdate(id, showtimeData, { new: true });
};

// Xóa suất chiếu theo ID
exports.deleteShowtime = async (id) => {
    return await ShowtimeModel.findByIdAndDelete(id);
};
