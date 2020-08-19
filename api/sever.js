const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const userRouter = require('../users/user-router.js');
const authRouter = require('../auth/auth-router.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({ work: "HECK" });
});

module.exports = server;