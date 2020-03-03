
exports.up = function(knex) {
    return (knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 128)
                .unique()
                .notNullable();
            tbl.string('password', 128)
                .unique()
                .notNullable(); 
            tbl.decimal('phone_number', 10) 
            //1234567890 does this need to be unsigned? or changed to a string? 
                .unique();
        }))
        .createTable('plants', tbl => {
            tbl.increments();
            tbl.string('species_name', 128)   
                //not unique, may have more than one of a plant, ex:succlents 
                .notNullable();
            tbl.string('nickname', 128)
                .notNullable();
            tbl.string('h2o_amount', 128)
                // is this set correctly? 
                .notNullable();
            tbl.integer('user_id') // name 
                .unsigned()         
                .notNullable()
                .references('users.id')  // table.place 
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
};

exports.down = function(knex) {
        return knex.schema 
            .dropTableIfExists('plants')
            .dropTableIfExists('users'); 
};
