const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(passport.initialize())
  app.use(cors())
  app.use(fileUpload());
  app.use('/public', express.static(__dirname + '/public'));
  console.log('Express ready!')
}
