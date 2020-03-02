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

    // √√ 
    describe('GET /testing-token', () => {
        it('should return 201 created', async () => {
            const res = await request(server).get('/testing-token');
            expect(res.status).toBe(201);
        })
    })

    //√√
    it('should return JOSN', async () => {
        const res = await request(server).get('/testing-token');
        expect(res.type).toBe("application/json");
    })

    // failed, not sure how to get the token logic in here from server.js
    it("should return {message: 'Testing Token', token: token} ", async () => {
        const res = await request(server).get('/testing-token');
        expect(res.body).toBe({message: 'Testing Token', token: token});
    })
}); 