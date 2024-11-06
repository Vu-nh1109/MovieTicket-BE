const MovieModel = require('../models/movie');

// Thêm phim mới
exports.createMovie = async (movieData) => {
    return await MovieModel.create(movieData);
};

// Lấy tất cả phim
exports.getAllMovies = async () => {
    return await MovieModel.find();
};

// Lấy phim theo ID
exports.getMovieById = async (id) => {
    return await MovieModel.findById(id);
};

// Cập nhật phim theo ID
exports.updateMovie = async (id, movieData) => {
    return await MovieModel.findByIdAndUpdate(id, movieData, { new: true });
};

// Xóa phim theo ID
exports.deleteMovie = async (id) => {
    return await MovieModel.findByIdAndDelete(id);
};
