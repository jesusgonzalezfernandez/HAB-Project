const isAdmin = (req, res, next) => {

    console.log('* Checking User Admin Rights *');

    const token = req.auth

    if (!token || !token.isAdmin) {
        
        console.log('User Does Not Have Admin Rights');
        res.status(403).send('Admin Rights Error')
        return

    }

    next();

}

module.exports = isAdmin;