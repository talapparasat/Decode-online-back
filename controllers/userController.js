const db = require('../models');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LastActivities = require('../services/LastActivities');
const {jwtSecret, jwtExpirationInterval} = require('../config/vars');


// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateFriendInput = require('../validation/addfriend');


exports.register = async function (req, res) {
    const {errors, isValid} = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    db.User.findOne({
        where: {email: req.body.email}
    })
        .then(async user => {
            if (user) {
                return res.status(400).json({email: 'Адрес электронной почты уже существует'})
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: 200, // Size
                    r: 'pg', //Rating
                    d: 'mm' //Default
                });

                const defaultStatus = await db.Status.findOne({
                    where: {
                        status: "Новичок"
                    }
                });

                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    statusId: defaultStatus.id
                };

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        db.User.create(newUser).then(user => {
                            LastActivities.saveLastActivity('registration', user.id);
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
                                        id: user.id,
                                        token: token,
                                        role: user.role
                                    });
                                }
                            );
                        })
                            .catch(err => console.log(err))
                    })
                })
            }
        })  .catch(err => console.log(err))
};

exports.login = async function (req, res) {
    const {errors, isValid} = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;


    // Find user by email
    db.User.findOne({
        where: {email: email}
    })
        .then(user => {
            // Check for user
            if (!user) {
                errors.email = 'Пользователь не найден';
                return res.status(404).json(errors);
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
                            {expiresIn: jwtExpirationInterval},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    id: user.id,
                                    token: token,
                                    role: user.role
                                });
                            }
                        );
                    } else {
                        errors.password = 'Неверный пароль';
                        return res.status(400).json(errors);
                    }
                })  .catch(err => console.log(err))
        })  .catch(err => console.log(err))
};


exports.current = async function (req, res) {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
};

exports.createStatus = async (req, res) => {
    try{
        const status = await db.Status.create({
            status: req.body.status,
        });
        res.status(201).json({status})
    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: "There was some error: " + e.message
        })
    }
};