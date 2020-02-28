const db = require('../database/dbConfig.js');

module.exports = {
    find,
    findBy, 
    add,
    findById,
    update, 
    remove
}

function find() {
    return db('plants').select('id', 'species_name', 'nickname', 'h2o_amount', 'user_id');
    // not sure if we need all notNullable data here 
}

function findBy(filter) {
    return db('plants').where(filter);
}

//new plant 
function add(plant) {
    return db('plants')
        .insert(plant, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        })
}

function findById(id) {
    return db('plants')
        .select('id', 'species_name', 'nickname')
        .where({ id })
        .first(); 
}

//edit plant 
function update(id, changes) {
    return db('plants')
        .where({ id })
        .update(changes);
}

// delete plant CANNOT UNDO! 
function remove(id) {
    return db('plants')
        .where('id', id)
        .del();
}