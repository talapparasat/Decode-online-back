const { Router } = require('express')
const router = Router()
const botController = require('../../controllers/botController')

router.get('/getSectionByCourseId', botController.getSectionByCourseId);
router.get('/getLessonsBySectionId', botController.getLessonsBySectionId);
router.get('/getRandomTasksByLessonId', botController.getRandomTasksByLessonId);
router.get('/getLessonsBySectionId2', botController.getLessonsBySectionId2);
module.exports = router
