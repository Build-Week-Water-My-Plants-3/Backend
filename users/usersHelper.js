const db = require('../database/dbConfig.js');


// create(add) read(find, findby, findbyid) update(update) delete (remove)
module.exports = { 
    find, 
    findBy,
    add, 
    findById,  
    update, 
    remove, 
};

// find all users /usersRouter  /users/allusers
function find(){ 
    return db('users').select('id', 'username', 'password');
}
// do I need to add email/phone to this list? 


function findBy(filter) {
    console.log(filter);
    return db('users').where(filter);
}


// new user 
function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        })
}


// finding by Id to see if it's a user, to edit? 
function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first(); 
}


// edit user 
function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes);
}


// delete user CANNOT undo! 
function remove(id) {
    return db('users')
        .where('id', id)
        .del();
}