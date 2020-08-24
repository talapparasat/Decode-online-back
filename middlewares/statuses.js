const db = require('../models');

const createStatuses = async () => {
    try {
        const statuses = [
            'Новичок',
            'Продвинутый'
        ];

        for(status of statuses) {
            db.Status.findOrCreate({
                where: {
                    status: status
                },
                defaults: {
                    status: status
                }
            })
        }
    } catch (e) {
        console.log(e)
    }
};

exports.createStatuses = createStatuses;