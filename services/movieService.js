const MovieModel = require('../models/movie');
const ShowtimeModel = require("../models/showtime");

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

exports.getMoviesNowShowing = async (page = 1, limit = 10) => {
    const currentTime = new Date();

    const showtimeMovies = await ShowtimeModel.find({ start_time: { $gte: currentTime } })
        .populate('movie_id') 
        .sort({ start_time: 1 }); 

    // Extract unique movies (to avoid duplicates for multiple showtimes)
    const uniqueMovies = [...new Map(
        showtimeMovies.map(item => [item.movie_id._id.toString(), item.movie_id])
    ).values()];

    const sortedMovies = uniqueMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    const startIndex = (page - 1) * limit;
    const paginatedMovies = sortedMovies.slice(startIndex, startIndex + limit);

    const transformedMovies = paginatedMovies.map(movie => ({
        ...movie._doc, 
        idmovie: movie._id 
    }));

    return transformedMovies;
};
