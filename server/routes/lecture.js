const express = require('express')
const authCheck = require('../config/auth-check')
const Lecture = require('../models/Lecture')
const Course = require('../models/Course')

const router = new express.Router()

function validateCourseCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.name = 'Course name must be at least 3 symbols.'
  }

  if (!payload || !payload.videoUrl || !payload.videoUrl.startsWith('http')) {
    isFormValid = false
    errors.image = 'VideoUrl is required and must be a valid url.'
  }



  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const lectureObj = req.body
  const courseId = req.body.course

  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateCourseCreateForm(lectureObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }
    // console.log(courseObj);

    Lecture
      .create(lectureObj)
      .then((createdLecture) => {
        Course.findById(courseId)
          .then(course => {
            course.lectures.push(createdLecture._id)
            course.save()
              .then(
                res.status(200).json({
                  success: true,
                  message: 'Lecture added successfully.',
                  data: createdLecture
                })
              )
          })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Course with the given name already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/getAllByCourseId', (req, res) => {
  Course.find()
    .then(courses => {
      res.status(200).json(courses)
    })
})

module.exports = router

