const authRoutes = require('../routes/auth')
const courseRoutes = require('../routes/course')
const lectureRoutes = require('../routes/lecture')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/course', courseRoutes)
  app.use('/lecture', lectureRoutes)
}
