const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '60d' });
}

const getAllAdmins = async (req, res) => {
    const admins = await Admin.find({}).sort({username: 1});
    res.status(200).json(admins);
}

const createAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.signup(username, password);
        const token = createToken(admin._id);
        res.status(200).json({admin, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.login(username, password);
        const token = createToken(admin._id);
        res.status(200).json({username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { getAllAdmins, createAdmin, loginAdmin };