const movieService = require('../services/movieService');

// Tạo phim mới
exports.createMovie = async (req, res) => {
    try {
        const movie = await movieService.createMovie(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: movie, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách tất cả các phim
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await movieService.getAllMovies();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: movies, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy thông tin phim theo ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: movie, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật thông tin phim
exports.updateMovie = async (req, res) => {
    try {
        const movie = await movieService.updateMovie(req.params.id, req.body);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: movie, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa phim
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await movieService.deleteMovie(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: movie, status: "deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMoviesNowShowing = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        const movies = await movieService.getMoviesNowShowing(page, limit);

        res.status(200).json({
            code: 200,
            message: "Thành công",
            data: movies
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            message: `Thất bại: ${err.message}`
        });
    }
};