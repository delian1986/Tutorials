const restrictedPages = require('./auth');
const authRoutes=require('../routes/auth')

module.exports = app => {
    app.use('/auth', authRoutes)
    
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};