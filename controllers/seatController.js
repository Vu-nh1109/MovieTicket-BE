const seatService = require('../services/seatService');

// Tạo ghế mới
exports.createSeat = async (req, res) => {
    try {
        const seat = await seatService.createSeat(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: seat, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách tất cả các ghế
exports.getAllSeats = async (req, res) => {
    try {
        const seats = await seatService.getAllSeats();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: seats, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy ghế theo ID
exports.getSeatById = async (req, res) => {
    try {
        const seat = await seatService.getSeatById(req.params.id);
        if (!seat) {
            return res.status(404).json({ error: "Seat not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: seat, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật thông tin ghế
exports.updateSeat = async (req, res) => {
    try {
        const seat = await seatService.updateSeat(req.params.id, req.body);
        if (!seat) {
            return res.status(404).json({ error: "Seat not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: seat, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật trạng thái ghế (ví dụ: từ "available" sang "booked")
exports.updateSeatStatus = async (req, res) => {
    try {
        const seat = await seatService.updateSeatStatus(req.params.id, req.body.status);
        if (!seat) {
            return res.status(404).json({ error: "Seat not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: seat, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa ghế
exports.deleteSeat = async (req, res) => {
    try {
        const seat = await seatService.deleteSeat(req.params.id);
        if (!seat) {
            return res.status(404).json({ error: "Seat not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: seat, status: "deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
