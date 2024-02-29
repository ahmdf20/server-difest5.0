const express = require('express')
const router = express.Router()
const AttendanceController = require('../controller/AttendanceController.js')
const CompetitionController = require('../controller/CompetitionController.js')
const TimelineController = require('../controller/TimelineController.js')
const uploadMiddleware = require('../upload.middleware.js')
const Auth = require('../controller/AuthController.js')
const User = require('../controller/UserController.js')
const SubmissionController = require('../controller/SubmissionController.js')
const submissionMiddleware = require('../submission.middleware.js')

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
router.get('/user/row/get', User.getUserByUserID)
router.get('/participant/all', User.getAllParticipant)
router.post('/participant/insert', User.insertParticipant)
router.post('/participant/check-password', User.comparePassword)
router.post('/participant/update-password', User.updatePasswordParticipant)

// Submission
router.get('/submissions', SubmissionController.getAllSubmission)
router.get('/submission/check', SubmissionController.checkKaryaIsSubmitted)
router.post('/submission/insert', submissionMiddleware, SubmissionController.insertSubmission)

module.exports = router