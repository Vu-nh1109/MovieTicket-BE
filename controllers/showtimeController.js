const showtimeService = require('../services/showtimeService');

// Tạo suất chiếu mới
exports.createShowtime = async (req, res) => {
    try {
        const showtime = await showtimeService.createShowtime(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: showtime, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách tất cả các suất chiếu
exports.getAllShowtimes = async (req, res) => {
    try {
        const showtimes = await showtimeService.getAllShowtimes();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: showtimes, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy suất chiếu theo ID
exports.getShowtimeById = async (req, res) => {
    try {
        const showtime = await showtimeService.getShowtimeById(req.params.id);
        if (!showtime) {
            return res.status(404).json({ error: "Showtime not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: showtime, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật suất chiếu
exports.updateShowtime = async (req, res) => {
    try {
        const showtime = await showtimeService.updateShowtime(req.params.id, req.body);
        if (!showtime) {
            return res.status(404).json({ error: "Showtime not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: showtime, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa suất chiếu
exports.deleteShowtime = async (req, res) => {
    try {
        const showtime = await showtimeService.deleteShowtime(req.params.id);
        if (!showtime) {
            return res.status(404).json({ error: "Showtime not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: showtime, status: "deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMovieShowtimes = async (req, res) => {
    const { idmovies, location, date } = req.query;

    try {
        const data = await showtimeService.getMovieShowtimes(idmovies, location, date);
        res.status(200).json({ code: 200, message: "Thành công", data });
    } catch (error) {
        res.status(400).json({ code: 400, message: "Thất bại", error: error.message });
    }
};

