const express = require('express')
const authCheck = require('../config/auth-check')
const Course = require('../models/Course')

const router = new express.Router()

function validateCourseCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.name = 'Book name must be at least 3 symbols.'
  }

  if (!payload || typeof payload.content !== 'string' || payload.content.length < 10 || payload.content.length > 200) {
    isFormValid = false
    errors.content = 'Description must be at least 10 symbols and less than 120 symbols.'
  }

  if (!payload || !payload.image ) {
    isFormValid = false
    errors.image = 'Image is required'
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
  const courseObj = req.body
  // console.log(courseObj);
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateCourseCreateForm(bookObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

  //   Course
  //     .create(bookObj)
  //     .then((createdCourse) => {
  //       res.status(200).json({
  //         success: true,
  //         message: 'Course added successfully.',
  //         data: createdCourse
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       let message = 'Something went wrong :( Check the form for errors.'
  //       if (err.code === 11000) {
  //         message = 'Course with the given name already exists.'
  //       }
  //       return res.status(200).json({
  //         success: false,
  //         message: message
  //       })
  //     })
  // } else {
  //   return res.status(200).json({
  //     success: false,
  //     message: 'Invalid credentials!'
  //   })
  }
})

module.exports = router