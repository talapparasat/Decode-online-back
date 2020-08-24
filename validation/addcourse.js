const Validator = require('validator');
const isEmpty = require('./isEmpty');


module.exports = function validateAddCourseInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.descriptions = !isEmpty(data.descriptions) ? data.descriptions : '';



    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if (Validator.isEmpty(data.descriptions)) {
        errors.descriptions = 'Name field is required';
    }



    return {
        errors,
        isValid: isEmpty(errors)
    };
};

