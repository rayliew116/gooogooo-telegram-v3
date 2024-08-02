const User = require('../models/userModel');
const mongoose = require('mongoose');

const getAllUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1});
    res.status(200).json(users);
}

const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        res.status(200).json(totalUsers);
    } catch (error) {
        console.error('Error counting users:', error);
        res.status(500).json({ message: 'Error counting users' });
    }
}

const getUsersLeaderboard = async (req, res) => {
    const {id} = req.params;

    try {
        // Get the logged-in user
        const loggedInUser = await User.findById(id);
    
        if (!loggedInUser) {
        return res.status(404).json({ message: 'User not found' });
        }
    
        // Get the top 20 users
        const topUsers = await User.find().sort({ points: -1 }).limit(20).exec();
    
        // Get the ranking of the current user
        const userRank = await User.countDocuments({ points: { $gt: loggedInUser.points } }) + 1;
    
        res.json({
        leaderboard: topUsers,
        currentUser: {
            user: loggedInUser,
            rank: userRank
        }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUserbyID = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID test.'});
    }
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({error: 'User not exist.'});
    }
    res.status(200).json(user);
}

const updateUser = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID.'});
    }
    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!user) {
        return res.status(404).json({error: 'User not exist.'});
    }
    res.status(200).json(user);
}





module.exports = {
    getAllUsers,
    getTotalUsers,
    getUsersLeaderboard,
    getUserbyID,
    updateUser
};