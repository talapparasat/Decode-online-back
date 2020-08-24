const sequelize = require('sequelize');
const db = require('../models');
const isEmpty = require('../validation/isEmpty');



exports.likeComment = async function (req, res) {
    try {
        let userId = req.user.id;
        let commentType = req.body.commentType;
        let condition;
            if(commentType=='Reply')condition='replyId'
            else condition="commentId"
        let commentId = req.body.commentId;
        let type = req.body.type;

        let exist = await db.Likes.findOne({
            where: {
                [condition]: commentId,
                userId: userId,
            }
        });
        if (exist) {
            if (exist.dataValues.type != type){
               let isSwitched = await switchLikeOrDislike(condition,commentId, userId, type);
               await updateNumberOfLikeAndDislike(commentType,condition,commentId);
                res.json(isSwitched);


            }
            else{
                let isdeleted = await deleteLikeOrDislike(condition,commentId, userId);
                await updateNumberOfLikeAndDislike(commentType,condition,commentId)
                res.json(isdeleted);
            }
        } else {
            let like = {userId: userId,
                        [condition]: commentId,
                        type: type};
           await db.Likes.create(like)
                .then(like =>
                    res.json({like: like})
                )
                .catch(err =>
                    res.status(500).json({msg: err})
                );
            await updateNumberOfLikeAndDislike(commentType,condition,commentId);
        }

    } catch (e) {
        res.json("There was some error: " + e.message)
    }
};

let deleteLikeOrDislike = async (condition,commentId, userId) => {
    try {
        let isDeleted = await db.Likes.destroy({
            where: {
                [condition]: commentId,
                userId: userId
            }
        });
        let newData = await db.Likes.findOne({
            where:{
                [condition]: commentId,
                userId: userId
            }
        });
        return {like: newData}
    } catch (e) {
        return false;
    }

};
let switchLikeOrDislike = async (condition,commentId, userId, type) => {
    try {
        let isSwtched = await db.Likes.update(
            {
                type: type
            },
            {
                where: {
                    [condition]: commentId,
                    userId: userId
                }
            }
        );
        let newData = await db.Likes.findOne({
            where:{
                [condition]: commentId,
                userId: userId
            }
        });

        return {like: newData};

    } catch (e) {
        return false;
    }

};


let updateNumberOfLikeAndDislike = async (commentType,condition,commentId) => {

    try {
        let likes = await db.Likes.findOne({
            where: {type: 'like', [condition]: commentId},
            attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'numberOfLike']],
            raw: true
        });
        let dislike = await db.Likes.findOne({
            where: {type: 'dislike', [condition]: commentId},
            attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'numberOfDislike']],
            raw: true,
        });

        await eval('db.'+commentType+'.update({ like: likes.numberOfLike, dislike: dislike.numberOfDislike }, { where: { id: commentId }});')

        return {msg: updated};

    } catch (e) {
        return false;
    }

};
