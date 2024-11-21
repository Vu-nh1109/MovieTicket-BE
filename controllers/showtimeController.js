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
/*
exports.getAllShowtimes = async (req, res) => {
    try {
        const showtimes = await showtimeService.getAllShowtimes();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: showtimes, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
*/

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
        // If specific filters are provided
        if (idmovies || location || date) {
            const filteredShowtimes = await showtimeService.getMovieShowtimes(idmovies, location, date);
            return res.status(200).json({ code: 200, message: "Thành công", data: filteredShowtimes });
        }

        // If no filters are provided, fetch all showtimes
        const allShowtimes = await showtimeService.getAllShowtimes();
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json({ code: 200, message: "Thành công", data: allShowtimes });
    } catch (error) {
        res.status(500).json({ code: 500, message: "Thất bại", error: error.message });
    }
};

exports.getSeatStatus = async (req, res) => {
    try {
        const result = await showtimeService.getSeatStatus(req.params.id);

        res.status(200).json({
            code: 200,
            message: "Thành công",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            message: `Thất bại: ${err.message}`
        });
    }
};
