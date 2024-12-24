const CustomerModel = require('../models/customer');
const jwt = require('jsonwebtoken');
const secretKey = '20241.IT4409';

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

exports.registerCustomer = async ({ name, email, phone, password }) => {
    const existingCustomer = await CustomerModel.findOne({ email });
    if (existingCustomer) {
        throw new Error("Email already exists!");
    }

    const newCustomer = new CustomerModel({
        name,
        email,
        phone,
        password
    });

    await newCustomer.save();

    return {
        id: newCustomer._id,
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone
    };
};

exports.loginCustomer = async ({ email, password }) => {
    const customer = await CustomerModel.findOne({ email });
    if (!customer) {
        throw new Error("Invalid credentials");
    }

    if (customer.password !== password) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { id: customer._id, email: customer.email, name: customer.name },
        secretKey,
        { expiresIn: '7d' }
    );

    return {
        token,
        customer_name: customer.name
    };
};