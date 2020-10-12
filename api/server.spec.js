const server = require('./server.js');
const request = require('supertest');

const db = require('../database/dbConfig.js');
const testUser = { username: 'testing', password: 'password' };

describe('server.js', () => {
	describe('GET all jokes', () => {
		it('should return a status code of 400 not logged in', async () => {
			const res = await request(server).get('/api/jokes');
			expect(res.status).toBe(400);
		});

		it('should return json', async () => {
			const res = await request(server).get('/api/jokes');
			expect(res.type).toBe('application/json');
		});
	});

	describe('registering a new user', () => {
		it('should return with status code of 201', async () => {
			await db('users').truncate();
			const res = await request(server).post('/api/auth/register').send(testUser);
			expect(res.status).toBe(201);
		});
		it('should return a status of 500', async () => {
			const res = await request(server).post('/api/auth/register').send({ user: 'test', password: 'test' });
			expect(res.status).toBe(500);
		});
    });
    
    describe('login the user', () => {
		it('should return with status code of 200', async () => {
			// await db('users').truncate();
            const res = await request(server)
            .post('/api/auth/login')
            .send(testUser);
			expect(res.status).toBe(200);
		});
		it('should return a status of 401', async () => {
            const res = await request(server)
            .post('/api/auth/login')
            .send({ username: 'test2', password: 'test2' });
			expect(res.status).toBe(401);
		});
	});
});
