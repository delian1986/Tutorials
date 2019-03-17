const express = require('express')
const authCheck = require('../config/auth-check')
const Course = require('../models/Course')
const User = require('../models/User')

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

  if (!payload || typeof payload.content !== 'string' || payload.content.length < 10 || payload.content.length > 200) {
    isFormValid = false
    errors.content = 'Description must be at least 10 symbols and less than 120 symbols.'
  }

  if (!payload || !payload.image || !payload.image.startsWith('http')) {
    isFormValid = false
    errors.image = 'Image is required and must be a valid url.'
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
  // console.log(req);
  const courseId = req.body.courseId
  const content = req.body.content
  const image = req.body.image
  const isListed = req.body.isListed
  const creator = req.body.creator
  const title = req.body.title

  const courseObj = { title, content, image, creator, isListed }
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateCourseCreateForm(courseObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }
    // console.log(courseObj);

    Course
      .create(courseObj)
      .then((createdCourse) => {
        res.status(200).json({
          success: true,
          message: 'Course added successfully.',
          data: createdCourse
        })
      })
      .catch((err) => {
        return res.status(200).json({
          success: false,
          message: err.message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit', authCheck, (req, res) => {
  const courseId = req.body.courseId
  const content = req.body.content
  const image = req.body.image
  const isListed = req.body.isListed
  const creator = req.body.creator
  const title = req.body.title

  const courseObj = { title, content, image }

  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateCourseCreateForm(courseObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Course.findById(courseId)
      .then((existingCourse) => {
        existingCourse.content = content
        existingCourse.image = image
        existingCourse.isListed = isListed
        existingCourse.creator = creator
        existingCourse.title = title

        existingCourse.save()
          .then(() => {
            res.status(200).json({
              success: true,
              message: 'Course edited successfully.'
            })
          })
          .catch((e) => {
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})


router.get('/all', (req, res) => {
  Course.find()
    .then(courses => {
      res.status(200).json(courses)
    })
})

router.get('/top', (req, res) => {

  Course.find({ isListed: true })
    .sort({ usersEnrolled: -1 })
    .limit(3)
    .then(found => {
      res.status(200).json({
        success: true,
        data: found
      })
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(200).json({
        success: false,
        message: e.message
      })
    })
})

router.get('/details/:id', (req, res) => {
  Course.findById(req.params.id)
    .populate('lectures')
    .then(course => {
      res.status(200).json({
        success: true,
        data: course
      })
    }).catch((e => {
      console.log(e);
    }))
})

router.post('/enroll', authCheck, (req, res) => {
  const { courseId, userId } = req.body

  User.findById(userId)
    .then(user => {
      if (user.enrolledCourses.indexOf(courseId === -1)) {
        user.enrolledCourses.push(courseId)
        user.save()
        .then(
          Course.findById(courseId)
          .then((foundCourse)=>{
            foundCourse.usersEnrolled.push(userId)
            foundCourse.timesEnrolled+=1
            foundCourse.save()
            .then(
              res.status(200).json({
                success: true,
                message: 'Course enrolled successfully.',
                data: user
              })
            )
          })
        )
      } else {
        throw new Error('You already enrolled this course!')
      }
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(200).json({
        success: false,
        message: e.message
      })
    })
})

router.get('/myCourses/:id', (req, res) => {
  const userId=req.params.id;

  User.findById(userId)
      .populate('enrolledCourses')
    .then(courses => {
      res.status(200).json(courses)
    })
})






module.exports = router
