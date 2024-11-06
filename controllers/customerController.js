const customerService = require('../services/customerService');

// Tạo khách hàng mới
exports.createCustomer = async (req, res) => {
    try {
        const customer = await customerService.createCustomer(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: customer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách tất cả các khách hàng
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: customers, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy khách hàng theo ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: customer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật thông tin khách hàng
exports.updateCustomer = async (req, res) => {
    try {
        const customer = await customerService.updateCustomer(req.params.id, req.body);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: customer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa khách hàng
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await customerService.deleteCustomer(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ data: customer, status: "deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
