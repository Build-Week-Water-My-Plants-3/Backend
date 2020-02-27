const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


// express routes 
const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/usersRouter.js'); 


// tokens 
const jwt = require('jsonwebtoken');  // for testertoken 

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

// routes
server.use('/', authRouter);  // leads to /register /login /userhome  etc 

server.use('/users', usersRouter);  // leads to /all
    // don't really need, but used to the set up.

server.get('/testing', (req, res) => {
    res.send(" Water My Plants 🌻");
});  // testing base of localhost. before adding end points.   √√√ 

// // tester token  √√√ 
server.get('/testing-token', (req, res) => {
    const payload = {
        subject: 'testtoken',
        userid: 'testytessa',
        favoritePlant: 'Rose'
    };
    const secret = "not your cup of tea";
    const options = {
        expiresIn: '1d'
    };
    const token = jwt.sign(payload, secret, options);
    res.json(token);
    });

module.exports = server; 

