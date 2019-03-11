const authRoutes = require('../routes/auth')
const courseRoutes = require('../routes/course')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/course', courseRoutes)
}
