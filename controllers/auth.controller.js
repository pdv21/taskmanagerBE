const auth = require('../services/auth.service');
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../utils/mailer');

const register = async(req, res) => {
    try {
        console.log('start register')
        const {full_name, email, password, phone, latitude, longitude, department, title} = req.body;
        const saltRounds = 10;
        const hashedPassword = await brcypt.hash(password, saltRounds);
        console.log('Start create user')
        const userId =  await auth.createUser(full_name, email, hashedPassword, phone, latitude, longitude, department, title);
        console.log(`User registered with email: ${email}`);
        
        res.status(201).json({ message: 'User registered successfully', userId });
        } catch (err) {
            res.status(500).json({ message: err.message });
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await auth.getUserByEmail(email);
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await brcypt.compare(password, user.password_hash);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const forgotPassword = async(req, res) => {
    try{
        const {email} = req.body;
        const user = await auth.getUserByEmail(email);
        if(!user) {
            return res.status(400).json({ message: 'Email not found' });
        }
        const token = crypto.randomBytes(32).toString('hex');
        const expire = Date.now() + 15*60*1000;
        await auth.saveResetToken(email, token, expire);
        
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?:${token}`;
        await mailer.sendResetEmail(email, resetLink);
        console.log(`Password reset link for ${email}: ${resetLink}`);
        res.status(200).json({ message: 'Password reset link has been sent to your email' });

    } catch (err) {
        res.status(500).json({ message: err.message });

    }
}

const resetPassword = async(req, res) =>{
    try{
        const {token, newPassword} = req.body;
        const user = await auth.getUserByResetToken(token);
        if(!user || user.reset_token_expire < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        const hashedPassword = await brcypt.hash(newPassword, 10);
        await auth.updatePassword(user.id, hashedPassword);
        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};