const db = require('../../models');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LastActivities = require('../../services/LastActivities');
const {jwtSecret, jwtExpirationInterval} = require('../../config/vars');


// Load input validation
const validateLoginInput = require('../../validation/login');


exports.login = async function (req, res) {

    const {errors, isValid} = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    console.log('Email', email);
    console.log('Password', password);

    // Find user by email
    db.User.findOne({
        where: {email: email}
    })
        .then(user => {
            // Check for user
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            if(user.role !== 'admin') {
                errors.admin = 'Access Forbidden';
                return res.status(403).send(errors);
            }

            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched

                        // Create JWT Payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        };

                        // Sign token
                        jwt.sign(
                            payload,
                            jwtSecret,
                            {expiresIn: jwtExpirationInterval+'m'},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: token,
                                });
                            }
                        );
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                })  .catch(err => console.log(err))
        })  .catch(err => console.log(err))
};

