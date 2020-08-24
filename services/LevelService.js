const db = require('../models');

exports.buyLevel = async function (levelId, userId, ) {
    let isPurchased;
    try {
        let result = await db.Level.findByPk(levelId,
            {
                include: [{
                    model: db.Section,
                    raw: true,
                    required: false,
                    include: [{
                        model: db.Course,
                        raw: true,
                        required: false,
                        include: [{
                            model: db.UserCourse,
                            raw: true,
                            required: false,
                            where: {userId}
                        }]
                    }]
                }],
                raw: true
            });

        if (result['Section.Course.UserCourses.chakra'] >= result.price) {
            isPurchased = await db.UserCourse.update(
                {
                    chakra: result['Section.Course.UserCourses.chakra'] - result.price
                },
                {
                    where: {
                        id: result['Section.Course.UserCourses.id'],
                        userId: userId
                    }
                }
            )
            isPurchased = !!isPurchased[0];
        } else isPurchased = false;

        return isPurchased;
    } catch (e) {
        return e;
    }
};

exports.updateLevel = async function (userLevelId) {
    let userLevel = await db.UserLevel.findByPk(userLevelId);

    let isUpdated = await db.UserLevel.update(
        {
            level: userLevel.level + 1
        },
        {
            where: {
                id: userLevelId
            }
        }
    );

    return !!isUpdated[0];
};

exports.createNewUserLevel = async function (sectionId, userId) {
    let isCreated = await db.UserLevel.create({
        userId: userId,
        sectionId: sectionId
    });

    return !!isCreated[0];
};