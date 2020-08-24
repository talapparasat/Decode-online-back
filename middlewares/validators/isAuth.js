const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');

module.exports = (req, res, next) => {
    try {
        if (!req.user) {
            throw new APIError({
                message: 'Authorization required',
                status: httpStatus.UNAUTHORIZED
            })
        }

        next()
    } catch (err) {
        next(err)
    }
};