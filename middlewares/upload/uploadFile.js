const fs = require('fs');
const uuidv4 = require('uuid').v4;
const path = require('path');
const DESTINATIONS = require('../../config/upload').destinations;

const uploadFile = ({folderName, formName}) => {
    return async (req, res, next) => {

        try {

            if (req.file === undefined) {
                console.log('file undefined');
                req.body[formName] = null;
                return next();
            }

            console.log('file defined');

            const buffer = req.file.buffer;

            const filename = uuidv4() + path.extname(req.file.originalname);

            const filepath = DESTINATIONS[folderName] + filename;

            fs.writeFileSync('public/' + filepath, buffer, 'binary');

            req.body[formName] = filepath;

            next()

        } catch (err) {
            next(err);
        }
    }
};

module.exports = uploadFile;