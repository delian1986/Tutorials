const bodyParser = require('body-parser')

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  // app.use((req, res, next) => {
  //   if (req.user) {
  //     res.locals.user = req.user;
  //   }
  //   next();
  // });
  // app.use((req, res, next) => {
  //   if (req.user) {
  //     res.locals.isAdmin = req.user.roles.indexOf('Admin') !== -1;
  //   }
  //   next();
  // });

  console.log('Express ready!')
}