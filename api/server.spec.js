const request =require('supertest');
const server = require('./server.js');


//√√
describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    //√√ 
    describe('GET /testing', () => {
        it(' should return 200 OK', async () => {
            const res = await request(server).get('/testing');
            expect(res.status).toBe(200);
        })
    })

    // √√ 
    it('should return JSON', async () => {
        const res = await request(server).get('/testing');
        expect(res.type).toBe('application/json');
    })

    // √√ 
    it('should return { message:" Water My Plants 🌻"}', async () => {
        const res = await request(server).get('/testing');
        expect(res.body).toEqual({ message:" Water My Plants 🌻"});
    })
}); 