const jwt = require('jsonwebtoken');
const config = require('./config');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.JWT_SECRET);
        number = decoded.role;
        id=decoded._id;
        req.role = number;
        req.userId=id;
        next();

    } catch (err) {
        return res.status(401).json({ message: "auth failed" });
    }
};