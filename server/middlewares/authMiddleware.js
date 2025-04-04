const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const tokenValidity = jwt.verify(token, 'scalerPod');
        req.body.userId = tokenValidity.userId;
        next();
    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Please login again.",
            error: "Token is invalid or expired",
        });
    }
}