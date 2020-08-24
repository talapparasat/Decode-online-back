const fs = require('fs');
const logger = require('../config/logger');

const removeFile = async (filename) => {
    try {
        if (filename) {
            await fs.unlinkSync('public/' + filename)
        }
    } catch (err) {
        logger.error(err)
    }
};

module.exports = removeFile;