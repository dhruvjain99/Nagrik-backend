const express = require('express');
const db = require('./config/mongoose');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
require('dotenv').config();
const passport = require('passport');
const jwtStrategy = require('./config/passport-jwt-strategy');

const port = process.env.PORT || 3000;
const io_port = 9898;

app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/', require('./routes'));

app.listen(port, (error) => {
    if(error){
        console.log("Error starting the server...", error);
        return;
    }
    console.log(`API server running at port ${port}.`);
});

const io = exports.io = require('socket.io')(io_port);

io.on("connection", function(socket) {
    console.log("Socket connection made");
});