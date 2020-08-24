const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');

module.exports = async function (req, res, next) {
    try {

        if(!req.user || req.user.role !== 'admin') {
            throw new APIError({
                message: 'Access to that resource is forbidden',
                status: httpStatus.FORBIDDEN,
            })
        }

        next()

    } catch (err) {
        next(err)
    }
};