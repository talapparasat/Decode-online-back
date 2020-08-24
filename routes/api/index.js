const express = require('express');
const isAuth = require('../../middlewares/validators/isAuth');
const isAdmin = require('../../middlewares/validators/isAdmin');

const bot = require('./botApi');
const users = require('./user');
const test = require('./test');
const course = require('./course');
const profile = require('./profile');
const section = require('./section');
const level = require('./level');
const lesson = require('./lesson');
const comment = require('./comment');
const task = require('./task');
const rating = require('./rating');
const activity = require('./activity');
const like = require('./like');
const help = require('./help');
const feedback = require('./feedback');
const adminRoutes = require('./admin');
const admin = require('./admin/admin');

const router = express.Router();

router.use(express.static(__dirname + '/../../public'));

router.use('/api/users', users);
router.use('/api/test', test);
router.use('/api/course', course);
router.use('/api/profile', profile);
router.use('/api/section', section);
router.use('/api/level', level);
router.use('/api/lesson', lesson);
router.use('/api/comment', comment);
router.use('/api/task', task);
router.use('/api/rating', rating);
router.use('/api/admin/auth', admin);
router.use('/api/admin', isAdmin, adminRoutes);
router.use('/api/activity', activity);
router.use('/api/like', like);
router.use('/api/help', help);
router.use('/api/feedback', feedback);
router.use('/api/bot', bot);


module.exports = router;