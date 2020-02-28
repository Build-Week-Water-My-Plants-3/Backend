const express = require('express');
// const bcrypt = require('bcryptjs');
const usersDB = require('./usersHelper');

const restricted = require('./restrictedToken'); 
const router = express.Router();


// server.js -> server.use('/users', usersRouter);   // witout mw √√    // w/ √√ mw 
router.get('/all', restricted, (req, res) => {
    usersDB.find()
        .then(allusers => {
            res.status(200).json(allusers);
        })
        .catch(error => {
            console.log('error', error);
            res.status(401).json({ message: ' You shall not pass 🤷‍♀️ '}); 
        });
});

module.exports = router; 