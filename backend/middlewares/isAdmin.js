const isAdmin = (req, res, next) => {

    if (!req.auth || !req.auth.isAdmin) {

        res.status(403).send('You do not have admin permission')
        return

    }

    next();

}

module.exports = isAdmin;