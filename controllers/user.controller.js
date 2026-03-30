const user = require('../services/user.service');

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const User = await user.getUserById(userId);
        res.json({
            data: User
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await user.deleteUserById(userId);
        res.json({
            message: 'User deleted successfully',
            result: result
        });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    try{
        const userId = req.user.userId;
        const data = req.body;
        const result = await user.updateUserById(userId, data);
        res.json({
            message: 'User updated successfully',
            result: result
        });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getUserProfile,
    deleteUser,
    updateUser
};