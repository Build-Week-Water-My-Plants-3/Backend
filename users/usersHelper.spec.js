const db = require('../database/dbConfig.js');
const Users = require('./usersHelper.js');
const bcrypt = require('bcryptjs'); 


// √√ 
describe('users helper', () => {
    beforeEach(async () => {
        await db('users').truncate();
    }); 
    // √√ 
    describe('add(user)', () => {
        it('should add 2 users into the database', async () => { 
            await Users.add({
                username: "leotherabbit",
                password: bcrypt.hashSync("carrotsss", 10)
            });
            await Users.add({ 
                username: "cookiethebunny", 
                password: bcrypt.hashSync("carrot", 10)
            });

            const users = await db('users');
            expect(users).toHaveLength(2);
        })
    })

    // √√ 
    it('should return the new user', async () => {
        let user = await Users.add({
            username: 'Aria',
            password: bcrypt.hashSync("RoseLilly", 10)
        });
        expect(user.username).toBe('Aria');

        user = await Users.add({
            username: 'Jack',
            password: bcrypt.hashSync("PizzaisMyFav", 10)
        });
        expect(user.username).toBe('Jack'); 
    })
})