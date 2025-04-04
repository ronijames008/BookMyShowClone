const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', async (req, res) => {
    const userExists = await User.findOne({
        email: req.body.email
    });

    if (userExists) {
        return res.send({
            success: false,
            message: "Existing email."
        });
    };

    //Salted and Hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);
    res.send({
        success: true,
        message: "Registration successful",
    });
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "User not found"
            })
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid Password"
            })
        }

        // JSON Web Token (JWT) generation
        const jwtToken = jwt.sign({ userId: user._id }, 'scalerPod', { expiresIn: '2d' });

        return res.send({
            success: true,
            message: "Logged in successfully",
            token: jwtToken,
        })
    } catch (err) {
        // console.log(err)
        return res.send({
            success: false,
            error: `ERROR: ${err}`
        })
    }

});

router.get('/validateToken', authMiddleware, async (req, res) => {
    const validatedUser = await User.findById(req.body.userId).select("-password");
    res.send({
        success: true,
        message: "Valid Token",
        user: validatedUser,
    });
});

module.exports = router;