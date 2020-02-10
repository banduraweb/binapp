const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "no authorization" });
        }

        const decoded = jwt.verify(token, process.env.jwtKey);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: "no authorization" });
    }
};
