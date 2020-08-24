const fs = require('fs');
const uuidv4 = require('uuid').v4;
const path = require('path');
const DEFAULTS = require('../../config/upload').defaults;
const DESTINATIONS = require('../../config/upload').destinations;

const updateFile = ({Model, folderName, formName, paramsIdName}) => {
    return async (req, res, next) => {

        try {

            const record = await Model.findByPk(req.params[paramsIdName]);

            if(req.file === undefined) {
                req.body[formName] = record[formName];
                return next();
            }

            if(record[formName] !== DEFAULTS[folderName]) {
                await fs.unlink('public/' + record[formName], function (err) {
                    console.log(err)
                });
            }

            const buffer = req.file.buffer;

            const filename = uuidv4() + path.extname(req.file.originalname);
            const filepath = DESTINATIONS[folderName] + filename;

            fs.writeFileSync('public/' + filepath, buffer, 'binary');

            req.body[formName] = filepath;

            next()

        } catch(err) {

            next(err)

        }
    };

};

module.exports = updateFile;