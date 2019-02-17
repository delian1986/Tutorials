module.exports = {
    isAuthed: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/user/login');
        }
    },
    hasRole: (role) => (req, res, next) => {
        if (req.isAuthenticated() &&
            req.user.roles.indexOf(role) > -1) {
            next();
        } else {
            res.redirect('/user/login');
        }
    },
	isAnonymous: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    },
    isSameUser: (req, res, next) => {
        if (req.user.id !== req.params.id) {
            res.redirect('/');
            return;
        }

        next();
    },
	canAccess: (req, res, next) => {

        if (req.user) {
            const articleId = req.params.id
            if (req.user.roles.indexOf('Admin') > -1 || req.user.articles.indexOf(articleId) > -1) {
                next()
            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/user/login');

        }
    }
}