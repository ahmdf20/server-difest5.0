const express = require('express')
const router = express.Router()
const AttendanceController = require('../controller/AttendanceController.js')
const CompetitionController = require('../controller/CompetitionController.js')
const TimelineController = require('../controller/TimelineController.js')
const uploadMiddleware = require('../upload.middleware.js')
const Auth = require('../controller/AuthController.js')
const User = require('../controller/UserController.js')

// Attendance Controller
router.get('/attendaces', AttendanceController.getAllAttendance)


// Competitions Controller
router.get('/competitions', CompetitionController.getAllCompetition)
router.post('/competition/submit', uploadMiddleware ,CompetitionController.handleSubmitCompetition)
// router.post('/competition/submit', upload.array('files', 4), CompetitionController.handleSubmitCompetition)

// Competitions Timelines Controller
router.get('/timelines', TimelineController.getAllTimeline)

// Auth Controller
router.post('/login', Auth.login)

// Users
router.get('/participant/all', User.getAllParticipant)
router.post('/participant/insert', User.insertParticipant)

module.exports = router