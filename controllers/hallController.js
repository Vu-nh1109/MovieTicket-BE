const hallService = require('../services/hallService');

// Tạo phòng chiếu mới
exports.createHall = async (req, res) => {
    try {
        const hall = await hallService.createHall(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: hall, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách tất cả các phòng chiếu
exports.getAllHalls = async (req, res) => {
    try {
        const halls = await hallService.getAllHalls();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: halls, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy phòng chiếu theo ID
exports.getHallById = async (req, res) => {
    try {
        const hall = await hallService.getHallById(req.params.id);
        if (!hall) {
            return res.status(404).json({ error: "Hall not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: hall, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật thông tin phòng chiếu
exports.updateHall = async (req, res) => {
    try {
        const hall = await hallService.updateHall(req.params.id, req.body);
        if (!hall) {
            return res.status(404).json({ error: "Hall not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: hall, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa phòng chiếu
exports.deleteHall = async (req, res) => {
    try {
        const hall = await hallService.deleteHall(req.params.id);
        if (!hall) {
            return res.status(404).json({ error: "Hall not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: hall, status: "deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
