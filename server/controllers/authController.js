const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    if (user) {
        try {
            await sendEmail({
                email: user.email,
                subject: 'Welcome to SF Movies!',
                message: `Hi ${user.username},\n\nWelcome to SF Movies! We are excited to have you on board.\n\nBest Regards,\nThe SF Movies Team`,
                html: `<h1>Welcome, ${user.username}!</h1><p>We are excited to have you on board using SF Movies.</p>`,
            });
        } catch (error) {
            console.error('Email sending failed:', error);
        }

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const upgradeUserToPremium = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.role = 'premium';
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    upgradeUserToPremium,
};
