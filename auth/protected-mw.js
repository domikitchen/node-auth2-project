const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET || 'hecc', (error, decodedToken) => {
            if(error) {
                res.status(401).json({ message: ">:O no!" });
            }
            else {
                req.jwt = decodedToken;

                next();
            }
        });
    }
    else {
        res.status(401).json({ message: "Please gimme creds" });
    }
}