const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;
const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('./routes/tweets.js')(app, io);

server.listen(port, () => {
    console.log('server is up');
});
