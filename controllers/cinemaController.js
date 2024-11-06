const cinemaService = require('../services/cinemaService');

// Tạo rạp chiếu phim mới
exports.createCinema = async (req, res) => {
    try {
        const cinema = await cinemaService.createCinema(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: cinema, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách tất cả các rạp chiếu phim
exports.getAllCinemas = async (req, res) => {
    try {
        const cinemas = await cinemaService.getAllCinemas();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: cinemas, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy thông tin rạp chiếu phim theo ID
exports.getCinemaById = async (req, res) => {
    try {
        const cinema = await cinemaService.getCinemaById(req.params.id);
        if (!cinema) {
            return res.status(404).json({ error: "Cinema not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: cinema, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật thông tin rạp chiếu phim
exports.updateCinema = async (req, res) => {
    try {
        const cinema = await cinemaService.updateCinema(req.params.id, req.body);
        if (!cinema) {
            return res.status(404).json({ error: "Cinema not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: cinema, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa rạp chiếu phim
exports.deleteCinema = async (req, res) => {
    try {
        const cinema = await cinemaService.deleteCinema(req.params.id);
        if (!cinema) {
            return res.status(404).json({ error: "Cinema not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: cinema, status: "deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
