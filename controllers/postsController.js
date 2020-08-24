const LastActivities = require('../services/LastActivities');

exports.getRecords = async function (req, res) {
    // Validate request parameters, queries using express-validator


    let lessonId = 2//req.params.id;
    let userId = 1//req.user.id;

    try {
        var results = await LastActivities.getUsers(lessonId, userId);
        return res.json({'result': results});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

};