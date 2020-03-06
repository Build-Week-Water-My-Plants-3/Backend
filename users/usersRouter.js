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


// endpoint /users/:id 

// √√ 
router.get('/:id', restricted, (req, res) => {
    const [id] = req.params.id;

    usersDB
        .findById(id)
        .then(user => {
            if (id) {
                res.status(200).json({message: ` Hello ${user.username}`, user: user});
            } else {
                res.status(404).json({ message: ' No user found with that ID'});
            }
        })
        .catch(error => {
            console.log('error', error);
            res.status(500).json({ message: "The user information could not be found."});
        });
});

module.exports = router; 