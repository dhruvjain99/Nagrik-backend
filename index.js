const express = require('express');
const db = require('./config/mongoose');
const app = express();
const port = 3000;

app.use('/', require('./routes'));

app.listen(port, (error) => {
    if(error){
        console.log("Error starting the server...", error);
        return;
    }
    console.log(`API server running at port ${port}.`);
});