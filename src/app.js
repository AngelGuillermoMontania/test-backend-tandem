const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json({ limit: '50mb' }));
server.use(morgan('dev'))
server.use(helmet())

// Error catching endware.
server.use((err, req, res, next) => { 
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server