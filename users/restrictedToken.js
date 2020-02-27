// using tokens, not session/cookies

const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');

module.exports = ( req, res, next ) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ message: ' Shall not pass, bad or expired, token. 🤷‍♀️'})
            } else {
                req.username = decodedToken.username; 
                next();
            }
        })
    } else {
        res.status(401).json({ message: ' No token provided 🙅‍♀️ '})
    }
}; 