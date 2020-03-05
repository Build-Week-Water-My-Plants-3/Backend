const router = require('express').Router();
const Users = require('../users/usersHelper.js');


//authentication  
const bcrypt = require('bcryptjs');  //hashing of password 
const jwt = require('jsonwebtoken');  //token 
const secret = require('../config/secrets.js'); // secret 
const restricted = require("../users/restrictedToken.js"); 

// server.js ->  server.use('/', authRouter); 
router.post('/register', (req, res) => {
    let user = req.body;  // username, password
    console.log(user);
    const hash = bcrypt.hashSync(user.password, 10);  //258 
    console.log(hash);
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


//  /login √√√ 
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log(user);

                const token = generateToken(user);

                res.status(200).json({ message: `Welcome 🌱 ${ user.username}!`, token: token,
            });
            } else { 
                res.status(401).json({ message: ' You shall not pass! 🙅‍♀️'})
            }
        })
        .catch(error => {
            console.log('error', error);
            res.status(500).json({ message: ' You shall not enter ✌🏻'});
        });
});


// router.post('/login', (req, res) => {
//     let { username, password} = req.body;  //postman raw JSON

//     Users.findBy({ username })
//         .first()
//         .then(user => {
//             if (user && bcrypt.compareSync(password, username.password)) {
//                 console.log(user);

//                 const token = generateToken(user);

//                 res.status(200).json({ message: `Welcome 🍀 ${user.username}! `, token: token });
//             } else {
//                 res.status(401).json({ message: ' You shall not pass, bad token! 🙅‍♀️'});
//             }
//         })
//         .catch(error => {
//             console.log('error', error);
//             res.status(500).json({ message: ' You shall not enter, no token. 🤷‍♀️'});
//         });
//});
// keeping this here for a mental note, it's okay to rewrite code instead of taking 30 mintues checking all your files and depencies. 

// √√  endpoint example /6 
router.get('/dashboard/:id', restricted, (req, res) => {
    const [id] = req.params.id;

    Users
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

// /logout  √√√  does not give a message/response, just empty. 

router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destory(error => {
            if (error) {
                res.send(' You can checkout whenever you want, but you cannot leave.')
            } else {
                res.send(' so long, thanks for coming! ')
            }
        })
    } else {
        res.end(); 
    }
});

// /edituser/:id   √√√ 
router.put('/edituser/:id', (req, res) => {
    const changes = req.body;
    const {id} = req.params;
    if(!changes.name && !changes.password) {
        res.status(400).json({ message: ' You must specify the username or password.'})
    } else {
        Users.update(id, changes) 
            .then(updated => {
                if (updated === null) {
                    res.status(404).json({ message: ` A user with id #${id} was not found.`})
                } else {
                    res.status(200).json(updated);
                }
            })
            .catch(error => {
                console.log('error', error);
                res.status(500).json({ message: ' We were unable to update the user or password', error})
            })
    }
});

//  /deleteuser √√√ 

router.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;

    Users.remove(id) 
        .then(deletedUser => {
            if (!id) {
                res.status(404).json({ message: ' The user with the specific ID does not exist.'});
            } else {
                res.status(200).json({ deletedUser});
            }
        })
    .catch(error => {
        console.log("error", error);
        res.status(500).json({ message: ' The user could not be removed'});
    })
})

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