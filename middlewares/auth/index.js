const db = require('../../models');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../config/vars');


const authenticate = async (req, res, next) => {
    let { authorization } = req.headers;

    if (!authorization) {
        req.user = undefined;
        return next();
    }

    authorization = authorization.replace("Bearer ", "");
    authorization = authorization.replace("bearer ", "");

    try {
        const decodedJWT = decodeJWT(authorization);

        req.user = await db.User.findByPk(decodedJWT.id);
    } catch(err) {
        req.user = undefined;
    }

    next();
};

const decodeJWT = (token) => {
    return jwt.verify(token, jwtSecret);
};

module.exports = authenticate;
