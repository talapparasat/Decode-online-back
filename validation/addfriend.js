const Validator = require('validator');
const isEmpty = require('./isEmpty');


module.exports = function validateFriendInput(data) {
    let errors = {};

    data.first_user_id = !isEmpty(data.first_user_id) ? data.first_user_id : '';
    data.second_user_id = !isEmpty(data.second_user_id) ? data.second_user_id : '';



    if (Validator.isEmpty(data.first_user_id)) {
        errors.first_user_idi = 'Email field is required';
    }



    if (Validator.isEmpty(data.second_user_id)) {
        errors.second_user_id = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};