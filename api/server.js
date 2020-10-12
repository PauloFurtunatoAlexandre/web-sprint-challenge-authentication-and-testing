const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
	res.json({ api: 'Server is running!' });
});

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
