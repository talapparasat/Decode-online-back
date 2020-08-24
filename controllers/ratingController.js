// const sequelize = require('sequelize');
// const db = require('../models');
// const isEmpty = require('../validation/isEmpty');
// const Op = sequelize.Op;
//
//
// exports.tasks = async function (req, res) {
//     let limit = 10;
//     let page = req.query['page'] ? req.query['page'] : 1;
//     let courseId = req.params.courseId;
//     let query = req.query['query'];
//     if (query === undefined || query === "undefined" || query.length === 0) {
//         db.UserTask.findAll({
//             attributes: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'total'],
//                 [sequelize.fn('count', sequelize.col('User.id')), 'totalUsers'],
//                 'userId',
//                 'User.name',
//                 'User->Status.status',
//                 'User->Clan.clan'
//             ],
//             include: [{
//                 model: db.Task,
//                 attributes: [],
//                 required: false,
//                 raw: true,
//
//                 include: [{
//                     model: db.Lesson,
//                     attributes: [],
//                     required: false,
//                     raw: true,
//
//                     include: [{
//                         model: db.Level,
//                         attributes: [],
//                         required: false,
//                         raw: true,
//                         include: [{
//                             model: db.Section,
//                             attributes: [],
//                             required: false,
//                             raw: true,
//                         }],
//                     }],
//                 }],
//
//             },
//                 {
//                     model: db.User,
//                     attributes: [],
//                     required: false,
//                     raw: true,
//                     include: [{
//                         model: db.Clan,
//                         attributes: [],
//                         required: false,
//                     },
//                         {
//                             model: db.Status,
//                             attributes: [],
//                             required: false,
//                             raw: true
//                         }]
//                 }
//             ],
//
//
//             group: ['userId', 'User.name', 'User->Status.status', 'User->Clan.clan'],
//             where: {
//                 '$Task.Lesson.Level.Section.courseId$': courseId
//             },
//             order: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'DESC']
//             ],
//             raw: true,
//             limit: limit,
//             offset: limit * (page - 1)
//
//         })
//             .then(result => {
//                 res.json({rating: result})
//             })
//             .catch(err => console.log(err));
//     } else {
//         query = query.toLowerCase();
//         db.UserTask.findAll({
//             attributes: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'total'],
//                 [sequelize.fn('count', sequelize.col('User.id')), 'totalUsers'],
//                 'userId',
//                 'User.name',
//                 'User->Status.status',
//                 'User->Clan.clan'
//             ],
//             include: [{
//                 model: db.Task,
//                 attributes: [],
//                 required: false,
//                 raw: true,
//
//                 include: [{
//                     model: db.Lesson,
//                     attributes: [],
//                     required: false,
//                     raw: true,
//
//                     include: [{
//                         model: db.Level,
//                         attributes: [],
//                         required: false,
//                         raw: true,
//                         include: [{
//                             model: db.Section,
//                             attributes: [],
//                             required: false,
//                             raw: true,
//                         }],
//                     }],
//                 }],
//
//             },
//                 {
//                     model: db.User,
//                     attributes: [],
//                     required: true,
//                     raw: true,
//                     where: sequelize.where(
//                         sequelize.fn('lower', sequelize.col('User.name')),
//                         {
//                             [Op.like]: '%' + query + '%'
//                         }
//                     ),
//                     include: [{
//                         model: db.Clan,
//                         attributes: [],
//                         required: false,
//                         where: sequelize.where(
//                             sequelize.fn('lower', sequelize.col('User->Clan.clan')),
//                             {
//                                 [Op.like]: '%' + query + '%'
//                             }
//                         ),
//                     },
//                         {
//                             model: db.Status,
//                             attributes: [],
//                             required: false,
//                             raw: true
//                         }]
//                 }
//             ],
//
//
//             group: ['userId', 'User.name', 'User->Status.status', 'User->Clan.clan'],
//             where: {
//                 '$Task.Lesson.Level.Section.courseId$': courseId
//             },
//             order: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'DESC']
//             ],
//             raw: true,
//             limit: limit,
//             offset: limit * (page - 1)
//
//         })
//             .then(result => {
//                 res.json({rating: result})
//             })
//             .catch(err => console.log(err));
//     }
// }
// exports.activity = async function (req, res) {
//     let limit = 10;
//     let page = req.query['page'] ? req.query['page'] : 1;
//     let query = req.query['query'];
//     if (query === undefined || query === "undefined" || query.length === 0) {
//         db.Comment.findAll({
//             attributes: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'total'],
//                 'userId',
//                 'User.name',
//                 'User.avatar',
//                 'User->Clan.clan',
//                 'User->Status.status',
//
//             ],
//             include: [{
//                 model: db.User,
//                 attributes: [],
//                 required: false,
//                 raw: true,
//                 include: [{
//                     model:
//                     db.Status,
//                     attributes: [],
//                     required: false
//                 }, {
//                     model: db.Clan,
//                     attributes: [],
//                     required: false
//                 }]
//             }],
//             group: ['userId', 'User->Status.status', 'User->Clan.clan', 'User.name', 'User.avatar'],
//             raw: true,
//             order: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'DESC']
//             ],
//             limit: limit,
//             offset: limit * (page - 1)
//         })
//             .then(results => {
//                 db.User.findAll({
//                     attributes:[[sequelize.fn('count', sequelize.col('id')), 'TotalUser']]
//                 }).then(totaluser=>{
//                     let total =totaluser[0].dataValues.TotalUser;
//                     res.json({rating: results,
//                         total})
//
//                 })            .catch(err => console.log(err));
//
//             })
//             .catch(err => console.log(err));
//     } else {
//         query = query.toLowerCase();
//         db.Comment.findAll({
//             attributes: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'total'],
//                 [sequelize.fn('count', sequelize.col('User.id')), 'totalUsers'],
//                 'userId',
//                 'User.name',
//                 'User.avatar',
//                 'User->Clan.clan',
//                 'User->Status.status',
//
//             ],
//             include: [{
//                 model: db.User,
//                 attributes: [],
//                 required: true,
//                 raw: true,
//                 where: sequelize.where(
//                     sequelize.fn('lower', sequelize.col('User.name')),
//                     {
//                         [Op.like]: '%' + query + '%'
//                     }
//                 ),
//                 include: [{
//                     model: db.Status,
//                     attributes: [],
//                     required: false
//                 }, {
//                     model: db.Clan,
//                     attributes: [],
//                     required: false
//                 }]
//             }],
//             group: ['userId', 'User->Status.status', 'User->Clan.clan', 'User.name', 'User.avatar'],
//             raw: true,
//             order: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'DESC']
//             ],
//             limit: limit,
//             offset: limit * (page - 1)
//         })
//             .then(results => {
//                 res.json({rating: results})
//             })
//             .catch(err => console.log(err))
//     }
// };
//
//
// exports.activityByCourse = async function (req, res) {
//     let limit = 10;
//     let page = req.query['page'] ? req.query['page'] : 1;
//     let courseId = req.params.courseId;
//     let query = req.query['query'];
//     if (query === undefined || query === "undefined" || query.length === 0) {
//         db.Comment.findAll({
//             attributes: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'total'],
//                 [sequelize.fn('count', sequelize.col('User.id')), 'totalUsers'],
//                 'userId',
//                 'User.name',
//                 'User.avatar',
//                 'User->Clan.clan',
//                 'User->Status.status',
//             ],
//             include: [{
//                 model: db.Lesson,
//                 attributes: [],
//                 required: false,
//                 raw: true,
//
//                 include: [{
//                     model: db.Level,
//                     attributes: [],
//                     required: false,
//                     raw: true,
//
//                     include: [{
//                         model: db.Section,
//                         attributes: [],
//                         required: false,
//                         raw: true,
//                     }],
//                 }],
//             },
//                 {
//                     model: db.User,
//                     attributes: [],
//                     required: false,
//                     raw: true,
//                     include: [{
//                         model: db.Status,
//                         attributes: [],
//                         required: false
//                     }, {
//                         model: db.Clan,
//                         attributes: [],
//                         required: false
//                     }]
//                 }
//             ],
//             group: ['userId', 'User.name', 'User.avatar', 'User->Clan.clan', 'User->Status.status',],
//             where: {
//                 '$Lesson.Level.Section.courseId$': courseId
//             },
//             order: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'DESC']
//             ],
//             raw: true,
//             limit: limit,
//             offset: limit * (page - 1)
//
//         })
//             .then(result => {
//                 res.json({rating: result})
//             })
//             .catch(err => console.log(err))
//     } else {
//         query = query.toLowerCase();
//         db.Comment.findAll({
//             attributes: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'total'],
//                 [sequelize.fn('count', sequelize.col('User.id')), 'totalUsers'],
//                 'userId',
//                 'User.name',
//                 'User.avatar',
//                 'User->Clan.clan',
//                 'User->Status.status',
//             ],
//             include: [{
//                 model: db.Lesson,
//                 attributes: [],
//                 required: false,
//                 raw: true,
//
//                 include: [{
//                     model: db.Level,
//                     attributes: [],
//                     required: false,
//                     raw: true,
//
//                     include: [{
//                         model: db.Section,
//                         attributes: [],
//                         required: false,
//                         raw: true,
//                     }],
//                 }],
//             },
//                 {
//                     model: db.User,
//                     attributes: [],
//                     required: true,
//                     raw: true,
//                     where: sequelize.where(
//                         sequelize.fn('lower', sequelize.col('User.name')),
//                         {
//                             [Op.like]: '%' + query + '%'
//                         }
//                     ),
//                     include: [{
//                         model: db.Status,
//                         attributes: [],
//                         required: false
//                     }, {
//                         model: db.Clan,
//                         attributes: [],
//                         required: false
//                     }]
//                 }
//             ],
//             group: ['userId', 'User.name', 'User.avatar', 'User->Clan.clan', 'User->Status.status',],
//             where: {
//                 '$Lesson.Level.Section.courseId$': courseId
//             },
//             order: [
//                 [sequelize.fn('count', sequelize.col('userId')), 'DESC']
//             ],
//             raw: true,
//             limit: limit,
//             offset: limit * (page - 1)
//
//         })
//             .then(result => {
//                 res.json({rating: result})
//             })
//             .catch(err => console.log(err))
//     }
// };


const sequelize = require('sequelize');
const db = require('../models');
const isEmpty = require('../validation/isEmpty');
const Op = sequelize.Op;


exports.tasks = async function (req, res) {
    let limit = 10;
    let page = req.query['page'] ? req.query['page'] : 1;
    let courseId = req.params.courseId;
    let query = req.query['query'];
    query = query.toLowerCase();
    db.UserTask.findAll({
        attributes: [
            [sequelize.fn('count', sequelize.col('userId')), 'total'],
            [sequelize.fn('count', sequelize.col('User.id')), 'totalUsers'],
            'userId',
            'User.name',
            'User->Status.status',
        ],
        include: [{
            model: db.Task,
            attributes: [],
            required: false,
            raw: true,

            include: [{
                model: db.Lesson,
                attributes: [],
                required: false,
                raw: true,

                include: [{
                    model: db.Level,
                    attributes: [],
                    required: false,
                    raw: true,
                    include: [{
                        model: db.Section,
                        attributes: [],
                        required: false,
                        raw: true,
                    }],
                }],
            }],

        },
            {
                model: db.User,
                attributes: [],
                required: true,
                raw: true,
                where: sequelize.where(
                    sequelize.fn('lower', sequelize.col('User.name')),
                    {
                        [Op.like]: '%' + query + '%'
                    }
                ),
                include: [{
                    model: db.Status,
                    attributes: [],
                    required: false,
                    raw: true
                }]
            }
        ],


        group: ['userId', 'User.name', 'User->Status.status'],
        where: {
            '$Task.Lesson.Level.Section.courseId$': courseId
        },
        order: [
            [sequelize.fn('count', sequelize.col('userId')), 'DESC']
        ],
        raw: true,
        limit: limit,
        offset: limit * (page - 1)

    })
        .then(result => {
            res.json({rating: result})
        })
        .catch(err => console.log(err));
};

exports.activity = async function (req, res) {
    let limit = 10;
    let page = req.query['page'] ? req.query['page'] : 1;
    let query = req.query['query'];
    query = query.toLowerCase();
    db.Comment.findAll({
        attributes: [
            [sequelize.fn('count', sequelize.col('userId')), 'total'],
            [sequelize.fn('count', sequelize.col('User.id')), 'totalUsers'],
            'userId',
            'User.name',
            'User.avatar',
            'User->Status.status',

        ],
        include: [{
            model: db.User,
            attributes: [],
            required: true,
            raw: true,
            where: sequelize.where(
                sequelize.fn('lower', sequelize.col('User.name')),
                {
                    [Op.like]: '%' + query + '%'
                }
            ),
            include: [{
                model: db.Status,
                attributes: [],
                required: false
            }]
        }],
        group: ['userId', 'User->Status.status', 'User.name', 'User.avatar'],
        raw: true,
        order: [
            [sequelize.fn('count', sequelize.col('userId')), 'DESC']
        ],
        limit: limit,
        offset: limit * (page - 1)
    })
        .then(results => {
            res.json({rating: results})
        })
        .catch(err => console.log(err))

};


exports.activityByCourse = async function (req, res) {
    let limit = 10;
    let page = req.query['page'] ? req.query['page'] : 1;
    let courseId = req.params.courseId;
    let query = req.query['query'].toLowerCase();
    db.Comment.findAll({
        attributes: [
            [sequelize.fn('count', sequelize.col('userId')), 'total'],
            [sequelize.fn('count', sequelize.col('User.id')), 'totalUsers'],
            'userId',
            'User.name',
            'User.avatar',
            'User->Status.status',
        ],
        include: [{
            model: db.Lesson,
            attributes: [],
            required: false,
            raw: true,

            include: [{
                model: db.Level,
                attributes: [],
                required: false,
                raw: true,

                include: [{
                    model: db.Section,
                    attributes: [],
                    required: false,
                    raw: true,
                }],
            }],
        },
            {
                model: db.User,
                attributes: [],
                required: true,
                raw: true,
                where: sequelize.where(
                    sequelize.fn('lower', sequelize.col('User.name')),
                    {
                        [Op.like]: '%' + query + '%'
                    }
                ),
                include: [{
                    model: db.Status,
                    attributes: [],
                    required: false
                }]
            }
        ],
        group: ['userId', 'User.name', 'User.avatar', 'User->Status.status',],
        where: {
            '$Lesson.Level.Section.courseId$': courseId
        },
        order: [
            [sequelize.fn('count', sequelize.col('userId')), 'DESC']
        ],
        raw: true,
        limit: limit,
        offset: limit * (page - 1)

    })
        .then(result => {
            res.json({rating: result})
        })
        .catch(err => console.log(err))
};