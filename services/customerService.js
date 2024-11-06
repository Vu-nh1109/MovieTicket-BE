const CustomerModel = require('../models/customer');

// Tạo khách hàng mới
exports.createCustomer = async (customerData) => {
    return await CustomerModel.create(customerData);
};

// Lấy tất cả các khách hàng
exports.getAllCustomers = async () => {
    return await CustomerModel.find();
};

// Lấy khách hàng theo ID
exports.getCustomerById = async (id) => {
    return await CustomerModel.findById(id);
};

// Cập nhật khách hàng theo ID
exports.updateCustomer = async (id, customerData) => {
    return await CustomerModel.findByIdAndUpdate(id, customerData, { new: true });
};

// Xóa khách hàng theo ID
exports.deleteCustomer = async (id) => {
    return await CustomerModel.findByIdAndDelete(id);
};
