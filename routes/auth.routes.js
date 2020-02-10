const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

router.post(
    "/registration",

    [

        check("email", "not valid email").isEmail(),
        check("password", "password min length 4 symbols").isLength({ min: 4 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({
                        errors: errors.array(),
                        message: `Not valid registration data:  ${errors
                            .array()
                            .map(item => item.msg)}`
                    });

            }

            const { email, password } = req.body;

            const newUserRegistration = await User.findOne({ email });

            if (newUserRegistration) {
                return res.status(400).json({ message: "This email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: "You are registered" });
        } catch (e) {
            res.status(500).json({ message: "errrrrr" }); // change to my custom error e
        }
    }
);

router.post(
    "/login",
    [
        check("email", "not correct email")
            .normalizeEmail()
            .isEmail(),
        check("password", "Enter the password").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: errors.array(), message: "Not valid login data" });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "User was not found" });
            }

            const isMatchedPassword = await bcrypt.compare(password, user.password);

            if (!isMatchedPassword) {
                return res.status(400).json({ message: "Not correct password" });
            }

            const token = jwt.sign({ userId: user.id }, process.env.jwtKey, {
                expiresIn: "24h"
            });

            res.status(200).json({ token, userId: user.id });
        } catch (e) {
            res.status(500).json({ message: "Error registration" });
        }
    }
);

module.exports = router;
