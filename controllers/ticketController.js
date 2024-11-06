const ticketService = require('../services/ticketService');

// Tạo vé mới
exports.createTicket = async (req, res) => {
    try {
        const ticket = await ticketService.createTicket(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: ticket, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách tất cả các vé
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getAllTickets();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: tickets, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy vé theo ID
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await ticketService.getTicketById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: ticket, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật thông tin vé
exports.updateTicket = async (req, res) => {
    try {
        const ticket = await ticketService.updateTicket(req.params.id, req.body);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: ticket, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật trạng thái thanh toán
exports.updatePaymentStatus = async (req, res) => {
    try {
        const ticket = await ticketService.updatePaymentStatus(req.params.id, req.body.payment_status);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: ticket, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa vé
exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await ticketService.deleteTicket(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: ticket, status: "deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
