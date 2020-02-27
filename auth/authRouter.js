const express = require('express');
const db = require('../users/usersHelper.js');
const router = express.Router();

//authentication  
const bcrypt = require('bcryptjs');  //hashing of password 
const jwt = require('jsonwebtoken');  //token 
const secret = require('../config/secrets.js'); // secret 

// server.js ->  server.use('/', authRouter); 
router.get('/register', (req, res) => {
    let user = req.body;  // username, password, email/phone# ! imgURL for stretch

    const hash = bcrypt.hashSync(user.password, 10);  //258 
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log("error", error);
            res.status(500).json({
                message: ' Failed to register a new user.'
            });
        });
});


//  /login 
router.post('login', (req, res) => {
    let { username, password} = req.body;  //postman raw JSON

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, username.password)) {
                console.log(user);

                const token = generateToken(user);

                res.status(200).json({ message: `Welcome 🍀 ${user.username}! `, token: token, });
            } else {
                res.status(401).json({ message: ' You shall not pass, bad token! 🙅‍♀️'});
            }
        })
        .catch(error => {
            console.log('error', error);
            res.status(500).json({ message: ' You shall not enter, no token. 🤷‍♀️'});
        });
});

function generateToken(user) {
    const payload = { 
        subject: user.id,
        username: user.username,
    };

    const options = {
        expiresIn: '1d',
    }

    const token = jwt.sign(payload, secret.jwtSecret, options);

    return token; 
}

module.exports = router;