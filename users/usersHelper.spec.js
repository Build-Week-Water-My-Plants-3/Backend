const db = require('../database/dbConfig.js');
const Users = require('./usersHelper.js');
const bcrypt = require('bcryptjs'); 


// 
describe('users helper', () => {
    // √√ 
    describe('add', () => {
        it('should add users into the database', async ()=> {
            await db('users').truncate();
            await Users.add({ username: "leotherabbit", password: bcrypt.hashSync("carrotsss", 10)});
            await Users.add({ username: "cookiethebunny", password: bcrypt.hashSync("carrot", 10)});

            const users = await db('users');
            expect(users).toHaveLength(2);
        })
    })
})