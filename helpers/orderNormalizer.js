const Op = require('sequelize').Op;

const normalizeOrdersOnCreate = async (Model, order, conditions, transaction = null) => {

    let count = await Model.count({
        where: {
            ...conditions
        },
        transaction
    });

    if (count === 0 || !order || order > count + 1 || order < 1) {
        return count + 1;
    }

    await Model.increment('order', {
        where: {
            ...conditions,
            order: {
                [Op.gte]: order
            }
        },
        transaction
    });

    return order;

};


const normalizeOrdersOnUpdate = async (Model, record, order, conditions, transaction = null) => {

    if (!order || order < 1) {
        return
    }

    if (record.order === order) {
        return;
    }

    const count = await Model.count({
        where: {
            ...conditions
        },
        transaction
    });

    if (order > count) {
        return;
    }

    if (record.order < order) {

        await Model.decrement('order', {
            where: {
                ...conditions,
                [Op.and]: [
                    {
                        order: {[Op.lte]: order}
                    },
                    {
                        order: {[Op.gt]: record.order}
                    }
                ]
            },
            transaction
        });

    } else {                                                                  // if (record.order > order)

        await Model.increment('order', {
            where: {
                ...conditions,
                [Op.and]: [
                    {
                        order: {[Op.lt]: record.order}
                    },
                    {
                        order: {[Op.gte]: order}
                    }
                ]
            },
            transaction
        });

    }

    record.order = order;
    await record.save();

};


const normalizeOrdersOnDelete = async (Model, order, conditions, transaction = null) => {

    await Model.increment('order', {
        by: -1,
        where: {
            ...conditions,
            order: {
                [Op.gt]: order
            }
        },
        transaction
    });

};

module.exports = {
    normalizeOrdersOnCreate,
    normalizeOrdersOnUpdate,
    normalizeOrdersOnDelete
};