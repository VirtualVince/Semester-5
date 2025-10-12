const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Signup
exports.signup = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: errors.array()[0].msg
            });
        }

        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'User already exists with this email or username'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: 'User created successfully.',
            user_id: user._id
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: errors.array()[0].msg
            });
        }

        const { email, username, password } = req.body;

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: email || '' }, { username: username || '' }]
        });

        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'Invalid Username and password'
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                status: false,
                message: 'Invalid Username and password'
            });
        }

        res.status(200).json({
            message: 'Login successful.'
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};